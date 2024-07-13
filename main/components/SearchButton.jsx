"use client";

import DropDownList from "./DropDownList";
import { BTN_SEARCH_DEFAULT_BEHAVIOUR, CATEGORIES, CATEGORY_TYPES } from "@utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { restartProducts } from "@app/redux/slices/products";
import { setText } from "@app/redux/slices/searchProperties";
import AutoCompletableList from "./AutoCompletableList";
import { useRouter } from "next/navigation";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import UserSearches from "./UserSearches";
import { translateCategory } from "@utils/functions";
import { setCategory } from "@app/redux/slices/siteNav";


const SearchButton = ({personalizedClass=""}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { text } = useSelector(state => state.searchProperties.properties);
  const { category} = useSelector(state => state.siteNav);
  const [userIsConnected, setUserIsConnected] = useState(false);
  const [showMySearchs, setShowMySearchs] = useState(false);
  
  const setInternalCategory = (category) => {
    dispatch(setCategory(category));
  };

  const restartFields = (value) => {
    dispatch(setText(value.replace(/[^a-zA-Z0-9 ]/g, "")));
    dispatch(restartProducts());
  }

  const executeSearch = (e) => {
    if (e) e.preventDefault();

    router.push(`/search/results?category=${category}&search=${text}`);
  }


  useEffect(()=>{
    const getUserSearch = async ()=>{
      const session = await getSession();
      const user =  session?.user;
      if (typeof user != 'undefined'){
        setUserIsConnected(true);
      }
    }
      getUserSearch();
  }, 
  []);

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
              <AutoCompletableList text={text} onChange={executeSearch} />
          </div>
    </div>
  );
}

export default SearchButton;