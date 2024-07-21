import ProductDetailComponent from '@components/ProductDetailComponent';
import fs from 'node:fs/promises';
import { revalidatePath } from "next/cache";


export async function generateMetadata({ params, searchParams }) {
  // read route params
  const productId = searchParams.pid
  const storeId = searchParams.sid
  // fetch data
  const product = await fetch(`https://encuentralofacilcr.com/api/search/local/myitems/${storeId}/${productId}/`).then((res) => res.json())
  
  const blob = b64toBlob(product.productImage[0].replace('data:image/jpeg;base64,', ''), 'data:image/jpeg;base64');
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  await fs.writeFile('https://encuentralofacilcr.com/uploads/' + productId + '.jpg', buffer);
  revalidatePath("/");
 
  return {
    title: "Encuéntralo Fácil CR - " + product.productName,
    description:product.productDescription,
    openGraph: {
      images: "https://encuentralofacilcr.com/uploads/" + productId +'.jpg',
    },
  }
}

const Details = () => {
  return (
    <ProductDetailComponent />
  );
};

export default Details;


const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
    
  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
}