"use client";
import Link from "next/link";

const ProductCard = ({ logo, product , index}) => {
  return (
    <div key={product.productName + index} className="block bg-transparent p-2 shadow-none w-64">
      <div
        className="relative overflow-hidden bg-cover bg-no-repeat"
        data-te-ripple-init
        data-te-ripple-color="light"
      >
        <img
          className="object-contain h-60 w-60"
          src={
            product.productImage == ""
              ? "https://www.edelar.com.ar/static/theme/images/sin_imagen.jpg"
              : product.productImage
          }
          alt={product.productName}
        />
              <img
          className="absolute z-90 object-contain h-6 rounded w-15 top-0"
          src={
          logo == ""
              ? "https://www.edelar.com.ar/static/theme/images/sin_imagen.jpg"
              : logo
          }
          alt={product.productName}
        />  
      </div>
      <div className="p-6">
        <p className="text-gray-800 dark:text-orange-600 w-full max-h-20 h-20 text-ellipsis overflow-hidden">
        {product.productName}        
        </p>
        <p className="mb-4 text-base text-bold dark:text-neutral-200">
          {product.productPrice}
        </p>
        <a
            href={product.vendorLink}
            className="inline-flex items-center font-medium text-orange-500 dark:text-blue-500 hover:underline"
          >
            Ver producto
            <svg
              className="w-4 h-4 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
      </div>
    </div>
  );
};

export default ProductCard;
