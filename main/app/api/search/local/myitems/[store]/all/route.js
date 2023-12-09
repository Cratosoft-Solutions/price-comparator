import { connectToDB } from "@utils/database";
import Product from '@models/product';
import { genericDatabaseOperation, escapeRegex,containsOnlyNumbers, paseStoreNumber } from "@utils/functions";



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
          productImage:element.image,
          productName: element.name,
          formatedPrice:paseStoreNumber(element.price)
      })
  });

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
