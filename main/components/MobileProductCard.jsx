import React from "react";
import { IoMdEye } from "react-icons/io";
import { useRouter } from "next/navigation";

const MobileProductCard = ({ product, index, adminMode, callBackFunction }) => {
  const router = useRouter();
  const handleProductClick=(url)=>{
    if(adminMode){
      callBackFunction(product.productId);
    }else{
      router.push(url);
    }
  }

  return (
    
    <div key={product.productName + index} className="container-fluid mx-auto w-full">
      <div
        className="relative flex bg-white border border-gray-300  overflow-hidden items-center justify-start"
        style={{ cursor: "auto" }}
      >
        <div className="relative w-32 h-32 !max-h-32 flex-shrink-0">
          <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center container-blur product-image">
          <a
            href={adminMode? "/redirigir": product.vendorLink}
            className="inline-flex items-center font-medium text-orange-500 hover:underline"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img
              alt="Placeholder Photo"
              className="absolute left-0 top-0 max-h-[95%] w-full h-full object-cover object-center transition duration-50"
              loading="lazy"
              src={product.productImage}
            />
          {adminMode? null: (<>{product.isLocal?null:<div className="centered-blur">REFERENCIA </div>}</>)} 
          </a>
          </div>
          
        </div>

          {product.companyLogo && (
            <img
              className="absolute z-100 object-contain h-6 rounded-full max-w-[5rem] button-0 right-2"
              src={
                product.companyLogo == undefined 
                  ? "https://www.edelar.com.ar/static/theme/images/sin_imagen.jpg"
                  : product.companyLogo
              }
              alt={product.companyLogo}
            />
          )}
        <div className="p-4">
          <p className="text-sm text-black font-[500]">{product.productName}</p>

          <p className="text-sm text-gray-500  mt-1 line-clamp-2 mb-2">
            {product.formatedPrice}
          </p>

          <button
          href={adminMode? "/redirigir": product.vendorLink}
          className="pt-1 inline-flex items-center justify-start gap-1 font-medium text-orange-500"
          onClick={()=>{handleProductClick(product.vendorLink)}}
        >
          <IoMdEye className="h-4 w-4"/>
          Ver producto
        </button>
        </div>
      </div>
    </div>
  );
};

export default MobileProductCard;
