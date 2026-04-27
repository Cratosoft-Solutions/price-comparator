"use client";

import DropDownList from "./DropDownList";
import {CATEGORY_TYPES } from "@utils/constants";
import { useDispatch, useSelector } from "react-redux";
import AutoCompletableList from "./AutoCompletableList";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { setCategory } from "@app/redux/slices/siteNav";
import { setText } from "@app/redux/slices/searchProperties";


const SearchButton = ({personalizedClass="", rounded=true}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { category} = useSelector(state => state.siteNav);
  const { text } = useSelector(state => state.searchProperties.properties);
  const [showCoincidences, setShowCoincidences] = useState(false);

  const setInternalCategory = (category) => {
    dispatch(setCategory(category));
  };

  const restartFields = (value) => {
    setShowCoincidences(true);
    dispatch(setText(value.replace(/[^a-zA-Z0-9 ]/g, "")));
  }

  const executeSearch = (e) => {
    if (e) 
      e.preventDefault();
    setShowCoincidences(false);
    redirectPage(category, text);
  }

  const redirectPage =(category, text)=>{
    router.push(`/search/results?category=${category}&search=${text}`);
  }


  return (
    <div className={`relative w-full ${personalizedClass}`}>
          <form onSubmit={executeSearch} className="grid grid-rows-1 grid-cols-[35%_65%] w-full h-full">
                <DropDownList 
                  values={CATEGORY_TYPES}  
                  onSelectValue={setInternalCategory}
                  currentValue={category}
                  additionalClass={`!bg-dark-elevated lg:!bg-dark-surface !text-dark-text !h-full border !border-dark-border !pt-0 !shadow-none ${rounded?"!rounded-l-full":""}`}
                /> 

            <div className="relative text-dark-muted h-full">              
              <input
                onChange={(e) => {
                  restartFields(e.target.value);
                }}
                value={text}
                id="txt-search"
                type="search"
                name="q"
                className={`bg-dark-surface text-dark-text ${rounded?"rounded-r-full":""} border-dark-border pl-10 focus:outline-none focus:border-accent-primary h-full w-full`}
                placeholder={`¿Qué buscas?`}
                autoComplete="off"
              />
            </div>
          </form>
          {showCoincidences &&
            <div className="grid grid-cols-1 grid-rows-1 w-full z-50">
                <AutoCompletableList text={text} onChange={redirectPage} />
            </div>
          }
    </div>
  );
}

export default SearchButton;
