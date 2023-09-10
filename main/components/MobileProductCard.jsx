import React from "react";

const MobileProductCard = ({ product, index }) => {
  return (
    <div key={product.productName + index} className="container-fluid mx-auto w-full">
      <div
        className="relative flex bg-white border border-gray-300  overflow-hidden items-center justify-start"
        style={{ cursor: "auto" }}
      >
        <div className="relative w-32 h-32 !max-h-32 flex-shrink-0">
          <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center">
            <img
              alt="Placeholder Photo"
              className="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50"
              loading="lazy"
              src={product.productImage}
            />
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
          <p className="text-sm ">{product.productName}</p>

          <p className="text-sm text-gray-500 mt-1 line-clamp-2 mb-2">
            {product.productPrice}
          </p>

          <span className="flex items-center justify-start text-gray-500">
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                clipRule="evenodd"
              ></path>
            </svg>
            <a href={product.vendorLink} target="_blank" rel="noreferrer noopener">Ver producto</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default MobileProductCard;
