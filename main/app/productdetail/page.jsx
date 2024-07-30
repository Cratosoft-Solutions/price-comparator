import ProductDetailComponent from '@components/ProductDetailComponent';

export async function generateMetadata({ params, searchParams }) {
try {
  // read route params
  const productId = searchParams.pid
  const storeId = searchParams.sid
  // fetch data
  const product = await fetch(`https://encuentralofacilcr.com/api/search/local/myitems/${storeId}/${productId}/`).then((res) => res.json())
  
  return {
    title: "Encuéntralo Fácil CR - " + product.productName,
    description:product.productDescription,
    openGraph: {
      images: product.socialMediaURL,
    }, 
  }  
} catch (error) {
  console.log(error);
  return {
    title: "Encuéntralo Fácil CR - Productos y Servicios al mejor precio",
    description:"Mira este anuncio y más en Encuéntralo Fácil CR",
    openGraph: {
      images: "https://encuentralofacilcr.com/assets/images/default-social-media-image.png",
    },
  }
}
}

const Details = () => {
  return (
    <ProductDetailComponent />
  );
};

export default Details;


