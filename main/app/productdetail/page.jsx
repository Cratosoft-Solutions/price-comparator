import ProductDetailComponent from '@components/ProductDetailComponent';
import axios from 'axios';
import { useSearchParams } from 'next/navigation'

export async function generateMetadata({ params, searchParams }) {
  // read route params
  const productId = searchParams.pid
  const storeId = searchParams.sid
  // fetch data
  const product = await fetch(`https://encuentralofacilcr.com/api/search/local/myitems/${storeId}/${productId}/`).then((res) => res.json())
  
  // optionally access and extend (rather than replace) parent metadata
  //const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: "Encuéntralo Fácil CR - " + product.productName,
    description:product.productDescription,
    openGraph: {
      images: product.productImage,
    },
  }
}

const Details = () => {
  return (
    <ProductDetailComponent />
  );
};

export default Details;
