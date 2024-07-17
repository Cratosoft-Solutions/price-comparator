import { connectToDB } from "@utils/database";
import Product from '@models/product';
import Tags from "@models/searchTags";
import UserSearch from "@models/userSearch";
import { genericDatabaseOperation, escapeRegex,containsOnlyNumbers, paseStoreNumber, genericCompression, saveUserSearch } from "@utils/functions";



export const GET = async (req, { params }) => {
  try {
    
    await connectToDB();
    console.log(params.text)
    const text = params.text.split("&")[1];
    const category = params.text.split("&")[0];
    // Get key words
    let searchKeywords = text.toUpperCase().split(/\s+/);

    if (searchKeywords.length > 10) {
      searchKeywords = searchKeywords.splice(0, 9);
    }
    console.log(searchKeywords);
    const filteredWords = searchKeywords.filter(
      (word) => !containsOnlyNumbers(word)
    );

    console.log("Filtered keywords" + filteredWords);
    //const hola = new RegExp(escapeRegex("hola", "gi"));
    //console.log(hola);
    //Check if Searchs exists
    const SearchExists = await genericDatabaseOperation(
        Product,
      {
        indexedField: {
          $in: searchKeywords.map(
            (keyword) => new RegExp(escapeRegex(keyword, "gi"))
          ),
        },
        category:category
      },
      "FIND_WITH_PROJECTION",
      null,
      null
    );

    const result = {
        companyName:"local",
        companyLogo:"/assets/images/comparator-logo.png",
        companyProducts:[]
    }

    SearchExists.forEach(element => {
        result.companyProducts.push({
            isLocal:true,
            productPrice:element.price,
            vendorLink:`https://encuentralofacilcr.com/${element._id}`,
            productImage:genericCompression(element.image, "decompress")[0],
            productName: element.name,
            productDescription:element.description,
            formatedPrice:paseStoreNumber(element.price),
            productId: element._id,
            storeId: element.store,
            currency: element.currency == "CRC" ? "₡" : "$",
            category: element.category,
            negotiable:element.negotiable
        })
    });

    // Get final search
    await saveUserSearch(
      Tags,
      UserSearch,
      text,
      category,
      "TODO"
    );

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
