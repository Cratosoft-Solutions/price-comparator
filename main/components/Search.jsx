"use client";
import React, { useState } from "react";
import SearchButton from "./SearchButton";
import ProductList from "./ProductList";
import SearchOptions from "./SearchOptions";
import { useSelector } from "react-redux";
import {RiArrowDownSLine} from "react-icons/ri";

const Search = () => {
  const { storeFullData } = useSelector((state) => state.products);
  const { loading } = useSelector(state =>state.siteloading);
  const [isOptionSearchExpanded, setIsOptionSearchExpanded] = useState(false);

  return (
    <>
      {storeFullData.length == 0 && !loading && (
        <section className="grid grid-cols-1 grid-rows-1 w-full">
          <h1 className="flex w-full justify-center font-bold p-4 h-32">
            <span className="orange_gradient text-center text-4xl lg:text-7xl">
              Compara Elige Ahorra
            </span>
          </h1>
          <div className="flex w-full justify-center mt-2">
            <SearchButton />
          </div>
        </section>
      )}

      {(storeFullData.length > 0 || loading) && (<SearchOptions setOptionSearch={setIsOptionSearchExpanded}/>
 
      )}

      <ProductList isOptionSearchExpanded={isOptionSearchExpanded}/>
    </>
  );
};

export default Search;
