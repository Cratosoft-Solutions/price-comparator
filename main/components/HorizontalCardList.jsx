"use client";
import React, { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import { element } from "prop-types";

const HorizontalCardList = ({mergedProducts, adminMode = false, callBackFunction=()=>{} }) => {
  const parentHTML = useRef(null);
  const [scrollInterval, setScrollInterval] = useState(null);
  const [scrollToLeft, setScrollToLeft] = useState(true);
  const [scrollToRight, setScrollToRight] = useState(true);
  //Accede a variable del state
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
    <div className="min-h-screen pb-24">
      {!adminMode && (
        <div className="w-full justify-left">
          <p className="text-sm text-black font-black">
            {" "}
            {`Encontramos ${mergedProducts.length} anuncios. Registros del ${
              FIRSTPOSITION + 1
            } al ${LASTPOSITION}`}
          </p>
        </div>
      )}

      <div className="grid gap-3 grid-cols-5 mt-4 mb-24">
        {mergedProducts
          .filter((element) => element.isLocal)
          .slice(FIRSTPOSITION, LASTPOSITION).length > 0
          ? mergedProducts
              .filter((element) => element.isLocal)
              .slice(FIRSTPOSITION, LASTPOSITION)
              .map((product, index) => (
                <ProductCard
                  key={index}
                  product={product}
                  index={index}
                  adminMode={adminMode}
                  callBackFunction={callBackFunction}
                />
              ))
          : mergedProducts
              .filter((element) => element.isLocal)
              .slice(0, size)
              .map((product, index) => (
                <ProductCard
                  key={index}
                  product={product}
                  index={index}
                  adminMode={adminMode}
                  callBackFunction={callBackFunction}
                />
              ))}
      </div>

      {!adminMode &&
        mergedProducts.filter(
          (element) => element.isLocal && element.category === "PRODUCT"
        ).length > 0 && (
          <div className="w-full justify-left">
            <p className="text-lg text-black font-black">
              {" "}
              {"Tambien te puede interesar"}
            </p>
          </div>
        )}

      <div className="grid gap-3 grid-cols-5 mt-4 mb-24">
        {!adminMode &&
          mergedProducts.filter((element) => !element.isLocal).length > 0 &&
          mergedProducts
            .filter((element) => !element.isLocal)
            .slice(FIRSTPOSITION, LASTPOSITION)
            .map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                index={index}
                adminMode={adminMode}
                callBackFunction={callBackFunction}
              />
            ))}
      </div>
    </div>
  );
};

export default HorizontalCardList;
