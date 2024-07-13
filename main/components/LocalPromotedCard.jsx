"use client";
import { useRouter } from "next/navigation";

const LocalPromotedCard = ({ product, index, callBackFunction }) => {
  const router = useRouter();
  const handleProductClick=(link)=>{
      router.push(link);
  }

  return (
    <div key={`CARD-${index}`} className=" hover:cursor-pointer flex flex-col w-32 h-fit  lg:w-fit lg:h-fit mr-4 bg-white rounded-t-lg lg:rounded-none	 overflow-hidden border border-1">
      <div className="h-full flex items-start justify-center items-center font-extrabold">{product.text}</div>      
         <div onClick={()=>{handleProductClick(product.redirectLink)}} className="w-32 h-fit lg:w-80 lg:h-fit flex justify-center" >
                <img
                    alt={product.redirectLink}
                    src={product.productImage}
                 className="w-32 h-32 lg:w-96 lg:h-full"   
                />
         </div>
    </div>
  );
};

export default LocalPromotedCard;
