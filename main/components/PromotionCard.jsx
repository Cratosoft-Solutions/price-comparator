"use client";

import GenericAnimation from "./GenericAnimation";

const PromotionCard = ({ product, index, callBackFunction }) => {
  const handleProductClick=()=>{
      callBackFunction(product);
  }

  return (
    <div key={`CARD-${index}`} className="shadow-gray-100 hover:border-gray-200 hover:shadow-xl promotion-image hover:cursor-pointer flex flex-col w-32 h-fit  lg:w-fit lg:h-fit mr-4 bg-slate-50 shadow-lg rounded-t-lg md:rounded-lg	 border border-1">

      <div className="text-black h-8 flex items-start justify-center font-extrabold pl-2 pr-2 mb-2 mt-2">{product.productName}</div>
      <div className="h-10 lg:h-4 flex-row lg:flex inline gap-2 items-center justify-center mt-2 lg:mt-0 md:mb-2">        
        <div className="lg:inline text-center">
            <span className='text-black text-xs'>{product.currency}</span>
            <span className='text-black text-xs'> 
            {product.formatedEspecialPrice != 0
                ? product.formatedEspecialPrice
                : product.formatedPrice} 
            </span>
        </div>
        
      </div>
      <div onClick={()=>{handleProductClick(product.productId)}} className="w-32 h-32 lg:w-64 lg:h-64 flex justify-center " >
                <img
                    alt={product.productDescription}
                    src={product.productImage}
                 className="w-32 h-32 lg:w-80 lg:h-64 aspect-square md:ml-4 md:mr-4"   
                />
                  {product.negotiable == "YES" && (
                    <GenericAnimation message="Precio Negociable"></GenericAnimation>
                  )}
         </div>
    </div>
  );
};

export default PromotionCard;
