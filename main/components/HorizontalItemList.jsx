"use client";
import React, { useEffect, useRef, useState } from "react";
import PromotionCard from "./PromotionCard";
import ProductDetails from "./store/ProductDetails";
import { BASIC_PRODUCT_MODEL } from "@utils/constants";
import { fetchWithTimeout, filterItemsByCategory } from "@utils/functions";
import { useSelector, useDispatch } from "react-redux";
import { setAdvertising } from "@app/redux/slices/advertising";
import { motion } from "framer-motion";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

const HorizontalItemList = ({ type, title }) => {
  const parentHTML = useRef(null);
  const dispatch = useDispatch();
  const [scrollInterval, setScrollInterval] = useState(null);
  const [autoInterval, setAutoInterval] = useState(null);
  const [scrollToLeft, setScrollToLeft] = useState(true);
  const [scrollToRight, setScrollToRight] = useState(true);
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [product, setProduct] = useState(BASIC_PRODUCT_MODEL);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataByCategory, setDataByCategory] = useState([]);
  const { category } = useSelector((state) => state.siteNav);
  const { promotions, mostSearched } = useSelector(
    (state) => state.advertising
  );

  useEffect(() => {
    const dataExist = checkState();
    if (!dataExist) {
      setLoading(true);
      const executeSearch = async () => {
        await fetchWithTimeout(`/api/search/local/data/${type}`)
          .then((r) => r.json())
          .then((data) => {
            dispatch(
              setAdvertising({ type: type, data: data.companyProducts })
            );
            setData(data.companyProducts);
            setDataByCategory(
              filterItemsByCategory(data.companyProducts, category)
            );
            setLoading(false);
          })
          .catch(() => setLoading(false));
      };
      executeSearch();
    }
  }, []);

  useEffect(() => {
    checkState();
  }, [category]);

  const checkState = () => {
    if (type == "promotions" && promotions.length > 0) {
      setData(promotions);
      setDataByCategory(filterItemsByCategory(promotions, category));
      return true;
    }
    if (type == "dailySearches" && mostSearched.length > 0) {
      setData(mostSearched);
      setDataByCategory(filterItemsByCategory(mostSearched, category));
      return true;
    }
    return false;
  };

  const sideScroll = (direction, speed, distance, step) => {
    let scrollAmount = 0;
    setScrollInterval(
      setInterval(function () {
        if (direction == "left") {
          parentHTML.current.scrollLeft -= step;
        } else {
          parentHTML.current.scrollLeft += step;
        }
        scrollAmount += step;
        if (scrollAmount >= distance) {
          window.clearInterval(scrollInterval);
        }
      }, speed)
    );
  };

  const stopInterval = () => {
    window.clearInterval(scrollInterval);
    validateScroll();
  };

  const validateScroll = () => {
    setScrollToLeft(Math.ceil(parentHTML?.current?.scrollLeft) < 50);
    setScrollToRight(
      Math.abs(
        Math.ceil(parentHTML?.current?.scrollLeft) -
          Math.ceil(
            parentHTML?.current?.scrollWidth - parentHTML?.current?.clientWidth
          )
      ) <= 1
    );
  };

  const executeAutomaticScroll = () => {
    try {
      if (
        Math.abs(
          Math.ceil(parentHTML?.current?.scrollLeft) -
            Math.ceil(
              parentHTML?.current?.scrollWidth -
                parentHTML?.current?.clientWidth
            )
        ) >= 1
      ) {
        parentHTML.current.scrollLeft += 500;
      } else {
        parentHTML.current.scrollLeft = 0;
      }
    } catch (error) {
      clearInterval(autoInterval);
    }
  };

  const onProductSelected = (product) => {
    setProduct(product);
    setShowProductDetail(true);
  };

  useEffect(() => {
    validateScroll();
    const tempAutoInterval = setInterval(() => {
      executeAutomaticScroll();
      validateScroll();
    }, 6000);
    setAutoInterval(tempAutoInterval);
  }, []);

  if (dataByCategory.length <= 0) return <></>;

  return (
    <div className="px-4 lg:px-10 pb-4 pt-6">
      {showProductDetail && (
        <ProductDetails
          onCloseFunction={() => {
            setShowProductDetail(false);
          }}
          storeId={product.storeId}
          productId={product.productId}
        />
      )}

      {/* Section Header */}
      <div className="flex items-center gap-3 mb-5 lg:mb-6">
        <h2 className="text-dark-text font-[1000] text-2xl lg:text-3xl">
          {title}
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-dark-border/50 to-transparent hidden lg:block" />
        {/* Desktop scroll buttons in header */}
        <div className="hidden lg:flex items-center gap-2">
          <button
            className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 ${
              scrollToLeft
                ? "border-dark-border/20 text-dark-border cursor-default"
                : "border-dark-border/40 bg-dark-surface/60 text-dark-text hover:bg-accent-primary/20 hover:border-accent-primary/40 hover:text-accent-glow backdrop-blur-sm"
            }`}
            onMouseUp={() => stopInterval()}
            onMouseDown={() => sideScroll("left", 5, 10, 10)}
            disabled={scrollToLeft}
          >
            <GoChevronLeft className="w-5 h-5" />
          </button>
          <button
            className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 ${
              scrollToRight
                ? "border-dark-border/20 text-dark-border cursor-default"
                : "border-dark-border/40 bg-dark-surface/60 text-dark-text hover:bg-accent-primary/20 hover:border-accent-primary/40 hover:text-accent-glow backdrop-blur-sm"
            }`}
            onMouseUp={() => stopInterval()}
            onMouseDown={() => sideScroll("right", 5, 10, 10)}
            disabled={scrollToRight}
          >
            <GoChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Scroll Container */}
      <div className="relative">
        {/* Fade edges */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-dark-bg to-transparent z-10 pointer-events-none transition-opacity duration-300 ${
            scrollToLeft ? "opacity-0" : "opacity-100"
          }`}
        />
        <div
          className={`absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-dark-bg to-transparent z-10 pointer-events-none transition-opacity duration-300 ${
            scrollToRight ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Mobile scroll buttons */}
        <div
          className={`lg:hidden ${
            scrollToLeft ? "hidden" : "flex"
          } absolute top-1/2 -translate-y-1/2 z-20 left-1`}
        >
          <button
            className="w-8 h-8 rounded-full flex items-center justify-center bg-dark-surface/80 border border-dark-border/40 text-dark-text backdrop-blur-sm shadow-lg"
            onMouseUp={() => stopInterval()}
            onMouseDown={() => sideScroll("left", 5, 10, 10)}
            onTouchStart={() => sideScroll("left", 5, 10, 10)}
            onTouchEnd={() => stopInterval()}
          >
            <GoChevronLeft className="w-4 h-4" />
          </button>
        </div>
        <div
          className={`lg:hidden ${
            scrollToRight ? "hidden" : "flex"
          } absolute top-1/2 -translate-y-1/2 z-20 right-1`}
        >
          <button
            className="w-8 h-8 rounded-full flex items-center justify-center bg-dark-surface/80 border border-dark-border/40 text-dark-text backdrop-blur-sm shadow-lg"
            onMouseUp={() => stopInterval()}
            onMouseDown={() => sideScroll("right", 5, 10, 10)}
            onTouchStart={() => sideScroll("right", 5, 10, 10)}
            onTouchEnd={() => stopInterval()}
          >
            <GoChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Cards container */}
        <motion.div
          className="flex no-scrollbar overflow-x-auto scroll-smooth snap-x snap-mandatory gap-3 lg:gap-4 pb-2"
          ref={parentHTML}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {dataByCategory.map((element, index) => (
            <div key={index} className="snap-start shrink-0">
              <PromotionCard
                index={index}
                product={element}
                callBackFunction={onProductSelected}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HorizontalItemList;
