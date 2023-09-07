"use client";
import React from "react";
import SearchButton from "./SearchButton";


const Search = () => {

  return (
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
  );
};

export default Search;
