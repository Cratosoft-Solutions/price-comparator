import { connectToDB } from "@utils/database";
import Search from '@models/search';
import Tags from "@models/searchTags";
import UserSearch from "@models/userSearch";
import { genericDatabaseOperation, saveUserSearch, escapeRegex,containsOnlyNumbers } from "@utils/functions";
import {closest} from 'fastest-levenshtein';
import { isTokenValid } from '@utils/authFunctionsServer';


export const POST = async (req) => {
  try {
    console.log("Starting validate");

    //Endpoint Token Validation
    const tokenStatus = await isTokenValid();
    if (!tokenStatus)
      return new Response("Unauthorized Access " + req.method, { status: 401 });

    const searchToSearch = await req.json();
    //DB
    await connectToDB();

    // Get key words
    let searchKeywords = searchToSearch.key.split(/\s+/);
    if (searchKeywords.length > 10) {
      searchKeywords = searchKeywords.splice(0, 9);
    }
    const filteredWords = searchKeywords.filter(
      (word) => !containsOnlyNumbers(word)
    );

    //Check if Searchs exists
    const SearchExists = await genericDatabaseOperation(
      Search,
      {
        key: {
          $in: searchKeywords.map(
            (keyword) => new RegExp(escapeRegex(keyword, "gi"))
          ),
        },
      },
      "FIND_WITH_PROJECTION",
      null,
      { _id: 0, key: 1 }
    );

    // Get final search
    const finalSearch = await getSearch(
      searchToSearch.key,
      SearchExists,
      Search
    );

    // Save user search
    await saveUserSearch(
      Tags,
      UserSearch,
      searchToSearch.key,
      searchToSearch.user
    );

    return new Response(JSON.stringify(finalSearch), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};

/**
 * Apply levenshtein to get closest keyword
 * @param {*} searchKey Search key
 * @param {*} searches results from db
 * @param {*} Search Mongo model
 * @returns final search
 */
const getSearch = async (searchKey, searches, Search) => {
  try {
    if (searches != null && searches.length > 0) {
      const searches2 = [];
      for (const search of searches) {
        searches2.push(search.key);
      }
      // Get closest key
      const closestKey = closest(searchKey, searches2);
      if (closestKey != null) {
        return await genericDatabaseOperation(
          Search,
          {
            key: closestKey,
          },
          "FINDONE"
        );
      } else {
        return searches[0];
      }
    } else {
      console.log("No results found")
      return {};
    }
  } catch (error) {
    console.log("Error getting closest search" + err);
    return {};
  }
};