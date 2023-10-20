"use client";
import React, { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";

const HorizontalCardList = ({mergedProducts }) => {
  const parentHTML = useRef(null);
  const [scrollInterval, setScrollInterval] = useState(null);
  const [scrollToLeft, setScrollToLeft] = useState(true);
  const [scrollToRight, setScrollToRight] = useState(true);
  const {page, size} = useSelector(state => state.sitepagination);

  const FIRSTPOSITION = (page-1)*size;
  const LASTPOSITION = (((page-1)*size) + size) > mergedProducts.length? mergedProducts.length: (((page-1)*size) + size);

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

  const validateScroll = ()=>{
    setScrollToLeft(Math.ceil(parentHTML?.current?.scrollLeft) < 50);
    setScrollToRight(Math.abs(Math.ceil(parentHTML?.current?.scrollLeft) - Math.ceil(parentHTML?.current?.scrollWidth - parentHTML?.current?.clientWidth)) <=1);
  }

  useEffect(()=>{
      validateScroll();
  }, []);


  return (
    <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 mt-2' >
            {mergedProducts.slice(FIRSTPOSITION, LASTPOSITION).map((product, index) => (
              <ProductCard key={index} product = {product} index={index}/>
            ))}
    </div>
  );
};

export default HorizontalCardList;
