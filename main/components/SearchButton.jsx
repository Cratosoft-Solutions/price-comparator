"use client";

import DropDownList from "./DropDownList";
import { CATEGORIES } from "@utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { restartProducts } from "@app/redux/slices/products";
import { setText, setCategory } from "@app/redux/slices/searchProperties";
import Link from "next/link";
import AutoCompletableList from "./AutoCompletableList";
import { useRouter } from "next/navigation";

const SearchButton = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { text, category } = useSelector(state => state.searchProperties.properties)
  
  const setInternalCategory = (category) => {
    dispatch(setCategory(category));
  };

  const restartFields = (value) => {
    dispatch(setText(value.replace(/[^a-zA-Z0-9 ]/g, "")));
    dispatch(restartProducts());
  }

  const executeSearch = (e)=>{
    e.preventDefault();
    router.push('/search/results');
  }

  return (
      <div className="mb-1 w-full sm:w-1/2 justify-center mr-4 ml-4">
        <div className="grid place-items-center w-full">
            <form onSubmit={executeSearch} className="grid grid-cols-1 grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 gap-0 w-full lg:grid-cols-[30%_70%]">
              <DropDownList values={CATEGORIES} onSelectValue={setInternalCategory} currentValue={category} />
             <div className="relative text-orange-500">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <button disabled={category == CATEGORIES[0].value || text.length < 3} type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </button>
                </span>
                <input onChange={(e)=>{restartFields(e.target.value)}}
                  value={text} 
                  id="txt-search" 
                  type="search" 
                  name="q" 
                  className="py-2 text-sm text-gray-500 bg-white border  lg:rounded-r-lg pl-10 focus:outline-none focus:bg-white h-16 w-full" placeholder="Buscar..." autoComplete="off"/>
               </div>
            </form>
            <div className="grid grid-cols-1 grid-rows-1 w-full">
              <AutoCompletableList text={text}/>
            </div>
        </div>
      </div>
    
  )
}

export default SearchButton;