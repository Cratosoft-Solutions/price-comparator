"use client";

import { useState } from "react";
import HorizontalPromotionTags from "./HorizontalPromotionTags";
import SocialShare from "./SocialShare";
import { BsShare } from "react-icons/bs";
import { GoArrowRight } from "react-icons/go";

const PromotionCard = ({ product, index, callBackFunction }) => {
  const [showShareModal, setShowShareModal] = useState(false);

  const handleProductClick = () => {
    callBackFunction(product);
  };

  const hasDiscount =
    product.formatedEspecialPrice != 0 &&
    product.formatedPrice != product.formatedEspecialPrice;

  const discountPercent = hasDiscount
    ? Math.round(
        ((product.formatedPrice - product.formatedEspecialPrice) /
          product.formatedPrice) *
          100
      )
    : 0;

  return (
    <>
      {showShareModal && (
        <SocialShare
          pid={product.productId}
          sid={product.storeId}
          onCloseFunction={setShowShareModal}
        />
      )}
      <div
        key={`CARD-${index}`}
        className="group relative flex flex-col w-44 lg:w-64 bg-dark-surface/60 rounded-2xl border border-dark-border/30 overflow-hidden cursor-pointer transition-all duration-300 hover:border-accent-primary/40 hover:shadow-lg hover:shadow-accent-primary/5 backdrop-blur-sm"
      >
        {/* Image Section */}
        <div
          onClick={handleProductClick}
          className="relative w-full aspect-[4/3] overflow-hidden bg-dark-elevated/30"
        >
          <img
            alt={product.productDescription}
            src={product.productImage}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Discount badge */}
          {hasDiscount && discountPercent > 0 && (
            <div className="absolute top-2 right-2 bg-accent-primary text-white text-xs font-bold px-2 py-0.5 rounded-lg shadow-md">
              -{discountPercent}%
            </div>
          )}

          {/* Share button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowShareModal(true);
            }}
            className="absolute top-2 left-2 w-7 h-7 rounded-full bg-dark-bg/60 backdrop-blur-sm border border-dark-border/20 flex items-center justify-center text-dark-muted hover:text-accent-glow hover:bg-dark-bg/80 transition-all duration-300 opacity-0 group-hover:opacity-100"
          >
            <BsShare className="w-3 h-3" />
          </button>

          {/* Tags overlay */}
          <div className="absolute bottom-0 left-0 right-0">
            <HorizontalPromotionTags product={product} />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col gap-1.5 p-3 lg:p-4">
          {/* Product Name */}
          <h3
            onClick={handleProductClick}
            className="text-dark-text font-semibold text-sm lg:text-base leading-tight line-clamp-2 group-hover:text-white transition-colors duration-300"
          >
            {product.productName}
          </h3>

          {/* Price */}
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-accent-glow font-bold text-base lg:text-lg">
              {product.currency}{" "}
              {hasDiscount
                ? product.formatedEspecialPrice
                : product.formatedPrice}
            </span>
            {hasDiscount && (
              <span className="text-dark-muted text-xs line-through">
                {product.currency} {product.formatedPrice}
              </span>
            )}
          </div>

          {/* CTA */}
          <div
            onClick={handleProductClick}
            className="flex items-center gap-1 text-dark-muted group-hover:text-accent-glow transition-all duration-300 mt-1"
          >
            <span className="text-xs lg:text-sm font-medium">Ver detalle</span>
            <GoArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-primary via-accent-glow to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>
    </>
  );
};

export default PromotionCard;
