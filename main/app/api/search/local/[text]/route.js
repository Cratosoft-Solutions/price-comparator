import { connectToDB } from "@utils/database";
import Product from '@models/product';
import { genericDatabaseOperation, escapeRegex,containsOnlyNumbers, paseStoreNumber } from "@utils/functions";



export const GET = async (req, { params }) => {
  try {
    
    await connectToDB();
console.log(params.text)
    // Get key words
    let searchKeywords = params.text.toUpperCase().split(/\s+/);
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
            productImage:element.image,
            productName: element.name,
            formatedPrice:paseStoreNumber(element.price)
        })
    });

    // Get final search
      console.log(SearchExists);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
