import { connectToDB } from "@utils/database";
import Product from '@models/product';
import { genericDatabaseOperation, escapeRegex,containsOnlyNumbers, paseStoreNumber, genericCompression } from "@utils/functions";
import searchProperties from "@app/redux/slices/searchProperties";



export const GET = async (req, { params }) => {
  try {
    
    await connectToDB();
    console.log("Ejecutar la busqueda en base A."+params.type);
    // Get key words
    /*let searchKeywords = params.text.toUpperCase().split(/\s+/);
    if (searchKeywords.length > 10) {
      searchKeywords = searchKeywords.splice(0, 9);
    }
   
    const filteredWords = searchKeywords.filter(
      (word) => !containsOnlyNumbers(word)
    );*/

    //console.log("Filtered keywords" + filteredWords);
    //const hola = new RegExp(escapeRegex("hola", "gi"));
    //console.log(hola);
    //Check if Searchs exists
    const SearchExists = await genericDatabaseOperation(
      Product,
      {},
      "FIND_NO_PARAMS",
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
            currency:element.currency =="CRC"?"₡":"$",
            formatedEspecialPrice:element.especialprice && element.especialprice !=0 ? paseStoreNumber(element.especialprice):0,
            productSpecialPrice:element.especialprice
        })
    });

    // Get final search
    //console.log('***JM*** VOY POR AQUI');
    console.log(SearchExists);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
