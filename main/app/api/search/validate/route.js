import { connectToDB } from "@utils/database";
import Search from '@models/search';
import Tags from "@models/searchTags";
import UserSearch from "@models/userSearch";
import { genericDatabaseOperation, saveUserSearch } from "@utils/functions";
import { isTokenValid } from '@utils/authFunctionsServer';



export const POST = async (req) => {
    try {
        //Endpoint Token Validation
        const tokenStatus = await isTokenValid();
        if(!tokenStatus) return new Response("Unauthorized Access " + req.method, { status: 401});
        
        const searchToSearch = await req.json();
         //DB
         await connectToDB();

        //Check if Searchs exists
        const SearchExists = await genericDatabaseOperation(
          Search,
          {
            key: searchToSearch.key,
          },
          "FINDONE"
        );
         
        const tagData =  searchToSearch.key.replaceAll(".", " ").split("-").slice(-2);
        await saveUserSearch(Tags, UserSearch, tagData, searchToSearch.user)   

        return new Response(JSON.stringify(SearchExists? SearchExists: {}), { status: 200 })
         
    } catch (error) {
        return new Response(JSON.stringify({message:error.message}), { status: 500 })

    }
    
}