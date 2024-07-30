import Product from "@models/product";
import { connectToDB } from "@utils/database";
import { genericDatabaseOperation } from "@utils/functions";
import { METATAGS } from "@utils/meta";

const BASE_URL ="https://www.encuentralofacilcr.com"
 
export async function generateSitemaps() {
  // If needed add more sitemaps. Limit 50000 URLS per sitemap
  return [{ id: 0 }]
}
 
export default async function sitemap({ id }) {
  await connectToDB();
  const products = await genericDatabaseOperation(Product, {}, "FIND_NO_PARAMS");
  const finalProducts = products.map(a => {return {category:a.category, text: a.name}}).concat(METATAGS);
  return finalProducts.map((product) => ({
    url: `${BASE_URL}/search/product/${product.category}/${product.text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z ]/g, "").replace(/\s/g,"-")}`,
    lastModified: new Date(),
  }))
}
