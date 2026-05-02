"use client";
import { BsShare } from "react-icons/bs";
import { GoLinkExternal } from "react-icons/go";
import HorizontalPromotionTags from "./HorizontalPromotionTags";
import SocialShare from "./SocialShare";
import { useState } from "react";

const ProductCard = ({ logo, product, index, adminMode, callBackFunction }) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleProductClick = () => {
    if (adminMode || product.isLocal) {
      callBackFunction(product);
    } else {
      window.open(product.vendorLink, "_blank");
    }
  };

  const hasSpecialPrice =
    Boolean(product.formatedEspecialPrice) &&
    product.formatedEspecialPrice != 0;

  const currencySymbol = product.currency === "CRC" ? "₡" : product.currency;

  return (
    <div className="relative group">
      {showShareModal && (
        <SocialShare
          pid={product.productId}
          sid={product.storeId}
          onCloseFunction={setShowShareModal}
        />
      )}
      <div
        key={product.productName + index}
        className="flex flex-col h-full bg-dark-surface rounded-xl overflow-hidden border border-dark-border/40 hover:border-accent-primary/30 hover:shadow-lg hover:shadow-accent-primary/5 transition-all duration-300"
      >
        {/* Image */}
        <div
          onClick={handleProductClick}
          className="relative w-full aspect-square bg-dark-elevated/30 flex items-center justify-center overflow-hidden cursor-pointer"
        >
          {!imgError && product.productImage ? (
            <img
              className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
              alt={product.productDescription || product.productName}
              loading="lazy"
              src={product.productImage}
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-dark-muted/40 text-xs">
              Sin imagen
            </div>
          )}

          {/* Reference badge */}
          {!adminMode && !product.isLocal && (
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-dark-bg/70 backdrop-blur-sm border border-dark-border/30 text-[10px] text-dark-muted font-medium uppercase tracking-wider">
              Referencia
            </div>
          )}

          {/* External link icon on hover */}
          {!product.isLocal && (
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="w-7 h-7 rounded-lg bg-dark-bg/70 backdrop-blur-sm border border-dark-border/30 flex items-center justify-center">
                <GoLinkExternal className="w-3.5 h-3.5 text-dark-muted" />
              </div>
            </div>
          )}

          {/* Share button */}
          {product.isLocal && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowShareModal(true);
              }}
              className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-dark-bg/70 backdrop-blur-sm border border-dark-border/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:border-accent-primary/40"
            >
              <BsShare className="w-3 h-3 text-dark-muted" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-3 gap-2">
          {/* Product Name */}
          <p
            onClick={handleProductClick}
            className="text-sm text-dark-text font-semibold leading-snug line-clamp-2 cursor-pointer hover:text-accent-glow transition-colors"
          >
            {product.productName}
          </p>

          {/* Price */}
          <div className="mt-auto flex flex-col gap-0.5">
            {hasSpecialPrice && (
              <span className="text-xs text-dark-muted line-through">
                {currencySymbol} {product.formatedPrice}
              </span>
            )}
            <span className="text-base font-bold text-accent-glow">
              {currencySymbol}{" "}
              {hasSpecialPrice
                ? product.formatedEspecialPrice
                : product.formatedPrice}
            </span>
          </div>
        </div>
      </div>

      {/* Promotion Tags */}
      {!adminMode && product.isLocal && (
        <div className="mt-2">
          <HorizontalPromotionTags product={product} />
        </div>
      )}
    </div>
  );
};

export default ProductCard;
