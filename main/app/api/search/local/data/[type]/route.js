import { connectToDB } from "@utils/database";
import Product from "@models/product";
import Tag from "@models/searchTags";
import {
  genericDatabaseOperation,
  getAdverstisedProducts,
  paseStoreNumber,
  genericCompression,
  getRankedTags,
} from "@utils/functions";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    console.log("Ejecutar la busqueda en base a: " + params.type);
    let result;

    switch (params.type) {
      case "promotions":
        let SearchExists = await getAdverstisedProducts(Product);
        // if products are null return a list of products randomly
        if (SearchExists === null || SearchExists.length < 3) {
          console.log('Getting regular products');
          SearchExists = SearchExists.concat(
            await genericDatabaseOperation(
              Product,
              {},
              "FIND_NO_PARAMS",
              null,
              null
            )
          );
          SearchExists =  [...new Set(SearchExists)];
        }
        result = {
          companyName: "local",
          companyLogo: "/assets/images/comparator-logo.png",
          companyProducts: [],
        };
        SearchExists.forEach((element) => {
          result.companyProducts.push({
            isLocal: true,
            productPrice: element.price,
            vendorLink: `https://encuentralofacilcr.com/${element._id}`,
            productImage: genericCompression(element.image, "decompress")[0],
            productName: element.name,
            productDescription: element.description,
            formatedPrice: paseStoreNumber(element.price),
            currency: element.currency == "CRC" ? "₡" : "$",
            formatedEspecialPrice:
              element.especialprice && element.especialprice != 0
                ? paseStoreNumber(element.especialprice)
                : 0,
            productSpecialPrice: element.especialprice,
          });
        });
        break;
      case "dailySearches":
        SearchExists = await getAdverstisedProducts(Product);
        // if products are null return a list of products randomly
        if (SearchExists === null || SearchExists.length < 3) {
          console.log('Getting regular products');
          SearchExists = SearchExists.concat(
            await genericDatabaseOperation(
              Product,
              {},
              "FIND_NO_PARAMS",
              null,
              null
            )
          );
          SearchExists =  [...new Set(SearchExists)];
        }
        result = {
          companyName: "local",
          companyLogo: "/assets/images/comparator-logo.png",
          companyProducts: [],
        };
        SearchExists.forEach((element) => {
          result.companyProducts.push({
            isLocal: true,
            productPrice: element.price,
            vendorLink: `https://encuentralofacilcr.com/${element._id}`,
            productImage: genericCompression(element.image, "decompress")[0],
            productName: element.name,
            productDescription: element.description,
            formatedPrice: paseStoreNumber(element.price),
            currency: element.currency == "CRC" ? "₡" : "$",
            formatedEspecialPrice:
              element.especialprice && element.especialprice != 0
                ? paseStoreNumber(element.especialprice)
                : 0,
            productSpecialPrice: element.especialprice,
          });
        });
        break;
      case "tags":
        result = {
          rankedKeywords: [],
        };
        const tagsResult = await getRankedTags(Tag);
        result.rankedKeywords = tagsResult.map((element) => element.key);
        console.log(`Ranked keys: ${result.rankedKeywords}`);
        break;
      default:
        break;
    }
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
