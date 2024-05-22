"use client";
import { useRouter } from "next/navigation";

const LocalPromotedCard = ({ product, index, callBackFunction }) => {
  const router = useRouter();
  const handleProductClick=(link)=>{
      router.push(link);
  }

  return (
    <div key={`CARD-${index}`} className="flex flex-col w-32 h-64 lg:w-80 lg:h-96 gap-2 lg:mr-10 ml-10">
         <div onClick={()=>{handleProductClick(product.redirectLink)}} className="w-32 h-32 lg:w-80 lg:h-64 flex justify-center" >
                <img
                    alt={product.redirectLink}
                    src={product.productImage}
                 className="w-32 h-32 lg:w-96 lg:h-full"   
                />
         </div>
      <div className="h-full flex items-start justify-center items-center font-extrabold">{product.text}</div>      
    </div>
  );
};

export default LocalPromotedCard;
