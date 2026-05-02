"use client";
import HorizontalItemList from "@components/HorizontalItemList";
import ProductDetails from "@components/store/ProductDetails";
import { useSearchParams } from "next/navigation";

const ProductDetailComponent = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get("pid");
  const storeId = searchParams.get("sid");

  return (
    <div className="bg-dark-bg min-h-screen">
      <div className="w-full max-w-7xl mx-auto px-4 lg:px-10 py-4 lg:py-6">
        <ProductDetails
          onCloseFunction={() => {}}
          productId={productId}
          storeId={storeId}
          adminMode={false}
          isModal={false}
        />
      </div>
      <div className="w-full">
        <HorizontalItemList
          type="promotions"
          title="¡Promociones que te pueden interesar!"
        />
      </div>
    </div>
  );
};

export default ProductDetailComponent;
