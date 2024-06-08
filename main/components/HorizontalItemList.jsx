"use client";
import React, { useEffect, useRef, useState } from "react";
import PromotionCard from "./PromotionCard";
import ProductDetails from "./store/ProductDetails";
import { BASIC_PRODUCT_MODEL } from "@utils/constants";
import LocalPromotedCard from "./LocalPromotedCard";

const HorizontalItemList = ({ companyProducts, companyLogo }) => {
  const parentHTML = useRef(null);
  const [scrollInterval, setScrollInterval] = useState(null);
  const [autoInterval, setAutoInterval] = useState(null);
  const [scrollToLeft, setScrollToLeft] = useState(true);
  const [scrollToRight, setScrollToRight] = useState(true);
  const [showProductDetail, setShowProductDetail]= useState(false);
  const [product, setProduct]= useState(BASIC_PRODUCT_MODEL);

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
          console.log('sdf');
          window.clearInterval(scrollInterval);
        }
      }, speed)
    );
  };

  const stopInterval = () => {
    window.clearInterval(scrollInterval);
   validateScroll();
  };

  const validateScroll = ()=>{
    setScrollToLeft(Math.ceil(parentHTML?.current?.scrollLeft) < 50);
    setScrollToRight(Math.abs(Math.ceil(parentHTML?.current?.scrollLeft) - Math.ceil(parentHTML?.current?.scrollWidth - parentHTML?.current?.clientWidth)) <=1);
  }

  const executeAutomaticScroll = () => {
    try {
      if (
        Math.abs(
          Math.ceil(parentHTML?.current?.scrollLeft) -
            Math.ceil(
              parentHTML?.current?.scrollWidth - parentHTML?.current?.clientWidth
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

  const onProductSelected = (product)=>{
    setProduct(product);
    setShowProductDetail(true);
  }

  useEffect(()=>{
      validateScroll();
      const tempAutoInterval = setInterval(() => {   
        executeAutomaticScroll();
        validateScroll();
      }, 6000);
      setAutoInterval(tempAutoInterval);
  }, []);


  return (
    <>
    {showProductDetail && <ProductDetails onCloseFunction={()=>{setShowProductDetail(false)}} storeId={product.storeId} productId={product.productId}/>}
    <div className="w-full mb-4 mt-12"><span className="font-[1000] text-2xl">Promociones</span></div>
        <div className="w-full flex bg-transparent mb-6 flex-col m-auto p-auto relative mt-1">
        <div className="absolute right-3 bottom-3">
            <img src={companyLogo} alt="" width={150}/>
        </div>
        <div className={`sm:flex hidden ${scrollToLeft?'lg:hidden':'flex'} absolute top-1/3 z-40 left-3`}>
            <button  className="rounded-full h-10 w-10 flex items-center justify-center bg-black"
            onMouseUp={() => {
                stopInterval();
            }}
            onMouseDown={() => {
                sideScroll("left", 5, 10, 10);
            }}
            >
            <svg
                class="w-6 h-6 text-white dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 8 14"
            >
                <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"
                />
            </svg>
            </button>
        </div>
        <div className={`sm:flex hidden ${scrollToRight?'lg:hidden':'flex'} absolute top-1/3 right-0 z-40 right-3`}>
            <button
            className="rounded-full h-10 w-10 flex items-center justify-center bg-black"
            onMouseUp={() => {
                stopInterval();
            }}
            onMouseDown={() => {
                sideScroll("right", 5, 10, 10);
            }}
            >
            <svg
                class="w-6 h-6 text-white dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 8 14"
            >
                <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
                />
            </svg>
            </button>{" "}
        </div>
        
        <div
            className="flex no-scrollbar overflow-x-auto"
            ref={parentHTML}
        >
            <div className="flex flex-nowrap">
            {companyProducts.map((element) => (
                <div className="inline-block">
                  {element.productId && <PromotionCard product={element} callBackFunction={onProductSelected} />}
                  {!element.productId && <LocalPromotedCard product={element} callBackFunction={onProductSelected} />}
                  </div>
            ))}

            </div>
        </div>
        </div>
        
        </>
  );
};

export default HorizontalItemList;
