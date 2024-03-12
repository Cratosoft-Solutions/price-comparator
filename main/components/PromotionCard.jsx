"use client";
import { useRouter } from "next/navigation";


const PromotionCard = ({ product, index, adminMode, callBackFunction }) => {
  const router = useRouter();
  const handleProductClick=(url)=>{
    if(adminMode){
      callBackFunction(product.productId);
    }else{
      router.push(url);
    }
  }

  return (
    <div key={`CARD-${index}`} className="flex flex-col w-32 h-64 lg:w-80 lg:h-96 gap-2">
         <div onClick={()=>{alert(product.productId)}} className="w-32 h-32 lg:w-80 lg:h-64 flex justify-center" >
                <img
                    alt={product.productDescription}
                    src={product.productImage}
                 className="w-32 h-32 lg:w-80 lg:h-64 aspect-square"   
                />
         </div>
      <div className="h-8 flex items-start justify-center font-extrabold">{product.productName}</div>
      <div className="h-10 lg:h-4 flex-row lg:flex inline gap-2 items-center justify-center mt-2 lg:mt-0">        
            {product.formatedEspecialPrice != 0 && (
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
            {product.formatedEspecialPrice != 0
                ? product.formatedEspecialPrice
                : product.formatedPrice} 
            </span>
        </div>
        
      </div>
    </div>
  );
};

export default PromotionCard;
