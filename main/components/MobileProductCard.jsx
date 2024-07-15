import React from "react";
import { IoMdEye } from "react-icons/io";
import { useRouter } from "next/navigation";
import HorizontalPromotionTags from "./HorizontalPromotionTags";

const MobileProductCard = ({ product, index, adminMode, callBackFunction }) => {
  const router = useRouter();
  const handleProductClick=(url)=>{
    if(adminMode || product.isLocal){
      callBackFunction(product);
    }else{
      window.open(product.vendorLink, '_blank');
    }
  }

  return (
    
    <div key={product.productName + index} className="container-fluid mx-auto w-full">
      <div
        className="hover:cursor-pointer relative flex bg-white border border-gray-300  overflow-hidden items-center justify-start"
        style={{ cursor: "auto" }}
      >
        <div className="relative w-32 h-32 !max-h-32 flex-shrink-0">
          <div className="p-2 absolute left-0 top-0 w-full h-full flex items-center justify-center container-blur product-image">
            <img
              alt="Productos y servicios. Encuéntralo Facil Costa Rica"
              className="w-full h-full"
              loading="lazy"
              src={product.productImage}
              onClick={()=>{handleProductClick(product.vendorLink)}}
            />
          {adminMode? null: (<>{product.isLocal?null:<div className="centered-blur">REFERENCIA </div>}</>)} 
          </div>
          {!adminMode && product.isLocal && <HorizontalPromotionTags product={product}/>}

        </div>
        <div className="grid grid-rows-2 grid-cols-1">
          <p className="text-sm text-black font-black text-ellipsis">{product.productName}</p>

          <div className="text-black font-[500]">

            {product.formatedEspecialPrice && 
             product.formatedEspecialPrice != 0 && (
              <div className="lg:inline text-left">
                <span className='text-xs'>{product.currency}</span>
                <span className="line-through text-xs">
                    {product.formatedPrice}
                </span>
              </div>
            )}
          <div className="lg:inline text-left">
              <span className='text-xs'>{product.currency}</span>
              <span className='text-xs'> 
              {product.formatedEspecialPrice &&
              product.formatedEspecialPrice != 0
                  ? product.formatedEspecialPrice
                  : product.formatedPrice} 
              </span>
          </div>
        </div>

        </div>

      </div>
    </div>
  );
};

export default MobileProductCard;
