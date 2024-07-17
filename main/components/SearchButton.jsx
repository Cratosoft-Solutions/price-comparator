"use client";

import DropDownList from "./DropDownList";
import {CATEGORY_TYPES } from "@utils/constants";
import { useDispatch, useSelector } from "react-redux";
import AutoCompletableList from "./AutoCompletableList";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { setCategory } from "@app/redux/slices/siteNav";
import { setText } from "@app/redux/slices/searchProperties";


const SearchButton = ({personalizedClass=""}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { category} = useSelector(state => state.siteNav);
  const { text } = useSelector(state => state.searchProperties.properties);

  const setInternalCategory = (category) => {
    dispatch(setCategory(category));
  };

  const restartFields = (value) => {
    dispatch(setText(value.replace(/[^a-zA-Z0-9 ]/g, "")));
  }

  const executeSearch = (e) => {
    if (e) 
      e.preventDefault();
    
    redirectPage(category, text);
  }

  const redirectPage =(category, text)=>{
    router.push(`/search/results?category=${category}&search=${text}`);
  }


  return (
    <div className={`relative w-full ${personalizedClass}`}>
          <form onSubmit={executeSearch} className="grid grid-cols-1 grid-rows-2 lg:grid-rows-1 lg:grid-cols-[35%_65%] w-full h-full">
              <div className='bg-white h-full w-full'>
                <DropDownList 
                  values={CATEGORY_TYPES}  
                  onSelectValue={setInternalCategory}
                  currentValue={category}
                  additionalClass={`!h-full border !pt-0 lg:!border-white !shadow-none`}
                /> 
              </div>

            <div className="relative text-gray-500 h-full">              
              <input
                onChange={(e) => {
                  restartFields(e.target.value);
                }}
                value={text}
                id="txt-search"
                type="search"
                name="q"
                className={`bg-white pl-10 focus:outline-none h-full w-full`}
                placeholder={`¿Qué buscas?`}
                autoComplete="off"
              />
            </div>
          </form>
          <div className="grid grid-cols-1 grid-rows-1 w-full z-50">
              <AutoCompletableList text={text} onChange={redirectPage} />
          </div>
    </div>
  );
}

export default SearchButton;