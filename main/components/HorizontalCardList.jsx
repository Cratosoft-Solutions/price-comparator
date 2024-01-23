"use client";
import React, { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";

const HorizontalCardList = ({mergedProducts, adminMode = false, callBackFunction=()=>{} }) => {
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
    <div className="min-h-screen">
      {!adminMode &&
        <div className="w-full justify-left">
          <p className="text-4xl font-[800] orange_gradient h-16">Busca el producto perfecto para ti.</p>
        </div>
      }

      <div className='grid gap-3 grid-cols-4 mt-4 mb-20' >
          {mergedProducts.slice(FIRSTPOSITION, LASTPOSITION).map((product, index) => (
            <ProductCard key={index} product = {product} index={index} adminMode={adminMode} callBackFunction={callBackFunction}/>
          ))}              
      </div>
    </div>
  );
};

export default HorizontalCardList;
