"use client";

import Link from "next/link";
import { IoMdEye } from "react-icons/io";
import { useRouter } from "next/navigation";


const ProductCard = ({ logo, product, index, adminMode, callBackFunction }) => {
  const router = useRouter();
  const handleProductClick=(url)=>{
    if(adminMode || product.isLocal){
      callBackFunction(product);
    }else{
      window.open(product.vendorLink, '_blank');
    }
  }

  return (
    <div
      key={product.productName + index}
      className={` hover:cursor-pointer product-image flex items-center justify-center block bg-white rounded-lg p-2 shadow shadow-gray-100 border border-gray-200 hover:border-gray-200 `}
    >
     <div key={`CARD-${index}`} className="flex flex-col w-32 h-64 lg:w-48 lg:h-80 gap-2">
         <div onClick={()=>{handleProductClick(product.productId)}} className="w-32 h-32 lg:w-48 lg:h-48" >
          <div className="p-2 absolute left-0 top-0 w-full h-full flex items-center justify-center container-blur product-image">
            <img
              alt="product.productDescription"
              loading="lazy"
              src={product.productImage}
            />
          {adminMode? null: (<>{product.isLocal?null:<div className="centered-blur">REFERENCIA </div>}</>)} 
          </div>
         </div>
      <div className="h-20 flex items-start justify-center font-extrabold">{product.productName}</div>
      <div className="h-10 lg:h-4 flex-row lg:flex inline gap-2 items-center justify-center mt-2 lg:mt-0">        
            {product.formatedEspecialPrice && 
             product.formatedEspecialPrice != 0 && (
              <div className="lg:inline text-center">
                <span className='text-xs'>{product.currency}</span>
                <span className="line-through text-xs">
                    {product.formatedPrice}
                </span>
              </div>
            )}
        
        <div className="lg:inline text-center">
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
  );
};

export default ProductCard;
