"use client";
import React, { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";

const HorizontalCardList = ({ searchConfigOptions, storeFullData, mergedProducts }) => {
  const parentHTML = useRef(null);
  const [scrollInterval, setScrollInterval] = useState(null);
  const [scrollToLeft, setScrollToLeft] = useState(true);
  const [scrollToRight, setScrollToRight] = useState(true);

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

  useEffect(()=>{
      validateScroll();
  }, []);


  return (
    <div div className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 xl:grid-cols-6 mt-2'>
    {searchConfigOptions.GROUPBYSTORE && storeFullData.map((element, index) => (
        <>
            {element.companyProducts.map((product, index)=>(
              <ProductCard logo={element.companyLogo} product ={product} index={index}/>
            ))}
        </>
        ))}{!searchConfigOptions.GROUPBYSTORE && mergedProducts.map((product, index)=>(
              <ProductCard  product ={product} index={index}/>
            ))}
    </div>
  );
};

export default HorizontalCardList;
