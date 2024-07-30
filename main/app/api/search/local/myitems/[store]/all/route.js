import { connectToDB } from "@utils/database";
import Product from '@models/product';
import { genericDatabaseOperation, escapeRegex,containsOnlyNumbers, paseStoreNumber, genericCompression } from "@utils/functions";



export const GET = async (req, { params }) => {
  try {
    
    await connectToDB();

    const SearchExists = await genericDatabaseOperation(
      Product,
      { store: params.store },
      "FIND"
    );

    const result = {
      companyName:"local",
      companyLogo:"/assets/images/comparator-logo.png",
      companyProducts:[]
  }

  SearchExists.forEach(element => {
      result.companyProducts.push({
          productId:element._id,
          productPrice:element.price,
          vendorLink:`https://encuentralofacilcr.com/${element._id}`,
          productImage:genericCompression(element.image, "decompress")[0],
          productName: element.name,
          productDescription:element.description,
          stock: element.stock?element.stock:0,
          formatedPrice:paseStoreNumber(element.price),
          formatedEspecialPrice:element.especialprice && element.especialprice !=0 ? paseStoreNumber(element.especialprice):0,
          currency:element.currency,
          category:element.category,
          isLocal:true,
          socialMediaURL: element.socialMediaURL,
          email:element.email,
          contactNumber:element.contactNumber,
          address:element.address
      })
  });

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
