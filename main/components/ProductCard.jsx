"use client";
import Link from "next/link";

const ProductCard = ({ logo, product, index }) => {
  return (
    <div
      key={product.productName + index}
      className="block bg-transparent p-2 shadow-none w-60"
    >
      <div
        className="relative overflow-hidden bg-cover bg-no-repeat product-image"
        data-te-ripple-init
        data-te-ripple-color="light"
      >
        <a
          href={product.vendorLink}
          className="inline-flex items-center font-medium text-orange-500 dark:text-blue-500 hover:underline"
          target="_blank"
          rel="noreferrer noopener"
        >
        <div className="container-blur">
          <img
            className="h-fit w-60 shadow border border-gray-200 shadow-lg rounded p-8"
            src={
              product.productImage == ""
                ? "https://www.edelar.com.ar/static/theme/images/sin_imagen.jpg"
                : product.productImage
            }
            alt={product.productName}
          />
          <div className="centered-blur">REFERENCIA</div>
        </div>
        {product.companyLogo && (
          <img
            className="absolute z-90 object-contain h-6 rounded-full max-w-[5rem] top-2 left-4"
            src={
              product.companyLogo == undefined
                ? "https://www.edelar.com.ar/static/theme/images/sin_imagen.jpg"
                : product.companyLogo
            }
            alt={product.productName}
          />
        )}
       </a>
      </div>
      <div className="p-1">
        <p className="text-black font-[500] w-full max-h-10 h-fit truncate overflow-hidden">
          {product.productName}
        </p>
        <p className="text-base text-bold dark:text-neutral-200">
          {product.formatedPrice}
        </p>
        <a
          href={product.vendorLink}
          className="inline-flex items-center font-medium text-orange-500 dark:text-blue-500 hover:underline"
          target="_blank"
          rel="noreferrer noopener"
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
