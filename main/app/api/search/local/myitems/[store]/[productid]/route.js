import { connectToDB } from "@utils/database";
import Product from '@models/product';
import { genericDatabaseOperation, escapeRegex,containsOnlyNumbers, paseStoreNumber, genericCompression } from "@utils/functions";



export const GET = async (req, { params }) => {
  try {
    
    await connectToDB();

    const SearchExists = await genericDatabaseOperation(
      Product,
      { _id: params.productid,
      store:params.store },
      "FINDONE"
    );

    let result = {};
    if(SearchExists){ 
      result = {
          productId:SearchExists._id,
          productPrice:SearchExists.price,
          productSpecialPrice:SearchExists.especialprice,
          vendorLink:`https://encuentralofacilcr.com/${SearchExists._id}`,
          productImage:genericCompression(SearchExists.image, "decompress"),
          productName: SearchExists.name,
          productDescription:SearchExists.description,
          stock: SearchExists.stock?SearchExists.stock:0,
          formatedPrice:paseStoreNumber(SearchExists.price),
          formatedEspecialPrice:SearchExists.especialprice && SearchExists.especialprice !=0 ? paseStoreNumber(SearchExists.especialprice):0,
          category:SearchExists.category,
          currency: SearchExists.currency,
          negotiable: SearchExists.negotiable
      };

      if(typeof SearchExists.otherinformation != undefined)
        result = {...result, otherInformation:SearchExists.otherinformation}
    }

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
