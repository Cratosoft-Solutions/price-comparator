import React, { useState } from "react";
import { BsShare } from "react-icons/bs";
import { GoLinkExternal } from "react-icons/go";
import HorizontalPromotionTags from "./HorizontalPromotionTags";
import SocialShare from "./SocialShare";

const MobileProductCard = ({ product, index, adminMode, callBackFunction }) => {
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
    <div
      key={product.productName + index}
      className="bg-dark-surface border border-dark-border/40 rounded-xl overflow-hidden mb-2 mx-2"
    >
      {showShareModal && (
        <SocialShare
          pid={product.productId}
          sid={product.storeId}
          onCloseFunction={setShowShareModal}
        />
      )}

      <div className="flex items-stretch">
        {/* Image */}
        <div
          onClick={handleProductClick}
          className="relative w-28 min-h-[7rem] flex-shrink-0 bg-dark-elevated/30 flex items-center justify-center cursor-pointer overflow-hidden"
        >
          {!imgError && product.productImage ? (
            <img
              alt={product.productName}
              className="w-full h-full object-contain p-2"
              loading="lazy"
              src={product.productImage}
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-dark-muted/40 text-[10px]">
              Sin imagen
            </div>
          )}

          {/* Reference badge */}
          {!adminMode && !product.isLocal && (
            <div className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-dark-bg/70 backdrop-blur-sm text-[9px] text-dark-muted font-medium uppercase tracking-wider">
              Ref.
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-3 gap-1.5 min-w-0">
          {/* Product Name */}
          <p
            onClick={handleProductClick}
            className="text-sm text-dark-text font-semibold leading-snug line-clamp-2 cursor-pointer"
          >
            {product.productName}
          </p>

          {/* Price */}
          <div className="flex flex-col gap-0.5 mt-auto">
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

          {/* Action buttons */}
          <div className="flex items-center gap-2 mt-1">
            {!product.isLocal && (
              <button
                onClick={handleProductClick}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-accent-primary/10 border border-accent-primary/20 text-accent-glow text-xs font-medium hover:bg-accent-primary/20 transition-colors"
              >
                <GoLinkExternal className="w-3 h-3" />
                Ver tienda
              </button>
            )}
            {product.isLocal && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowShareModal(true);
                }}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-dark-elevated/50 border border-dark-border/30 text-dark-muted text-xs hover:text-dark-text hover:border-dark-border transition-colors"
              >
                <BsShare className="w-3 h-3" />
                Compartir
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Promotion Tags */}
      {!adminMode && product.isLocal && (
        <div className="px-3 pb-2">
          <HorizontalPromotionTags product={product} />
        </div>
      )}
    </div>
  );
};

export default MobileProductCard;
