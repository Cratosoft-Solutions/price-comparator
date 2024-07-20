"use client";
import HorizontalItemList from '@components/HorizontalItemList';
import ProductDetails from '@components/store/ProductDetails';
import { useSearchParams } from 'next/navigation'


const Details = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get('pid');
  const storeId = searchParams.get('sid');


  return (
    <div className="w-full lg:mr-10 lg:ml-10 bg-white lg:mb-4 mt-4">
        <ProductDetails onCloseFunction={()=>{}} productId={productId} storeId={storeId} adminMode={false} isModal={false}/>     
        <HorizontalItemList type="promotions" title="¡Promociones que te pueden interesar!"/>

    </div>
  );
};

export default Details;
