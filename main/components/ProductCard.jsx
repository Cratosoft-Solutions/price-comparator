"use client";

import Link from "next/link";
import { IoMdEye } from "react-icons/io";
import { useRouter } from "next/navigation";


const ProductCard = ({ logo, product, index, adminMode, callBackFunction }) => {
  const router = useRouter();
  const handleProductClick=(url)=>{
    if(adminMode){
      callBackFunction(product.productId);
    }else{
      router.push(url);
    }
  }

  return (
    <div
      key={product.productName + index}
      className={`product-image block bg-white rounded-lg p-2 shadow shadow-gray-100 border border-gray-200 hover:border-orange-200 `}
    >
      <div
        className="relative overflow-hidden bg-cover bg-no-repeat"
        data-te-ripple-init
        data-te-ripple-color="light"
      >
        <a
          href={adminMode? "/redirigir": product.vendorLink}
          className="inline-flex items-center font-medium text-orange-500  hover:underline"
          target="_blank"
          rel="noreferrer noopener"
        >
        <div className="container-blur">
          <img
            className="w-60 h-60 rounded"
            src={
              product.productImage == ""
                ? "https://www.edelar.com.ar/static/theme/images/sin_imagen.jpg"
                : product.productImage
            }
            alt="Productos y servicios. Encuéntralo Facil Costa Rica"
          />
          {adminMode? null: (<>{product.isLocal?null:<div className="centered-blur">REFERENCIA </div>}</>)} 
        </div>
        {product.companyLogo && (
          <img
            className="absolute z-90 object-contain h-6 rounded-full max-w-[5rem] top-2 left-4"
            src={
              product.companyLogo == undefined
                ? "https://www.edelar.com.ar/static/theme/images/sin_imagen.jpg"
                : product.companyLogo
            }
            alt="Productos y servicios. Encuéntralo Facil Costa Rica"
          />
        )}
       </a>
      </div>
      <div className="p-1">
        <p className="text-black font-[500] w-full max-h-10 h-fit truncate overflow-hidden">
          {product.productName}
        </p>
        <p className="inline-block mb-4 text-black font-[500]">
            <span className='mr-2'>{product.currency}</span>
            <span> 
              {product.formatedEspecialPrice != 0
                ? product.formatedEspecialPrice
                : product.formatedPrice} 
            </span>
            {product.formatedEspecialPrice != 0 && (
              <span className="text-sm font-normal text-red-500 line-through">
                {product.formatedPrice}
              </span>
            )}
        </p>
        <button
          href={adminMode? "/redirigir": product.vendorLink}
          className="pt-1 inline-flex items-center gap-1 font-medium text-orange-500"
          onClick={()=>{handleProductClick(product.vendorLink)}}
        >
          <IoMdEye className="h-4 w-4"/>
          Ver producto
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
