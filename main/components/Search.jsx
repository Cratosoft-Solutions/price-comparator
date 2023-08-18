"use client";
import React, { useState } from "react";
import SearchButton from "./SearchButton";
import ProductList from "./ProductList";
import SearchOptions from "./SearchOptions";
import { CATEGORIES } from "@utils/constants";
import { useSelector } from "react-redux";

const Search = () => {
  const { storeFullData } = useSelector((state) => state.products);
  const [textSearchArray, setTextSearchArray] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0].value);

  const setTextArray = (searchText) => {
    setSearchText(searchText.replace(/[^a-zA-Z0-9 ]/g, ""));
    setTextSearchArray(searchText.toUpperCase().split(" "));
  };

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
            <SearchButton
              onTextEntered={setTextArray}
              searchText={searchText}
              selectedCategory={selectedCategory}
              onSetSelectedCategory={setSelectedCategory}
            />
          </div>
        </section>
      )}

      {storeFullData.length > 0 && (
        <SearchOptions textSearchArray={textSearchArray} />
      )}
      <ProductList />
    </>
  );
};

export default Search;
