"use client";
import React from "react";
import SearchButton from "./SearchButton";
import ProductList from "./ProductList";
import SearchOptions from "./SearchOptions";
import { useSelector } from "react-redux";

const Search = () => {
  const { storeFullData } = useSelector((state) => state.products);

  return (
    <>
      {storeFullData.length == 0 && (
        <section className="grid grid-cols-1 grid-rows-2 w-full">
          <h1 className="flex w-full justify-center font-bold p-4">
            <span className="orange_gradient text-center text-4xl lg:text-7xl ">
              Compara Elige Ahorra
            </span>
          </h1>
          <div className="flex w-full justify-center">
            <SearchButton/>
          </div>
        </section>
      )}

      {storeFullData.length > 0 && (<SearchOptions /> )}

      <ProductList />
    </>
  );
};

export default Search;
