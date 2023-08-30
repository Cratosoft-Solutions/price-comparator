"use client";

import DropDownList from "./DropDownList";
import { CATEGORIES, STORE_BY_CATEGORY } from "@utils/constants";
import { fetchWithTimeout, formatKeyForStorage, getSearchDataFromDataBase, localDataExists, saveSearchOnDB, setStorageData } from "@utils/functions";
import { useDispatch, useSelector } from "react-redux";
import { pushProduct, restartProducts } from "@app/redux/slices/products";
import { setLoading } from "@app/redux/slices/loading";
import { setSearching } from "@app/redux/slices/searching";
import { setText, setCategory } from "@app/redux/slices/searchProperties";
import { useState } from "react";
import AutoCompletableList from "./AutoCompletableList";


const SearchButton = () => {
  const dispatch = useDispatch();
  const { text, category } = useSelector(state => state.searchProperties.properties)
  let searchCounter = 0;
  let storeToSearhCount = STORE_BY_CATEGORY.filter((item)=> item.category == category)[0]?.stores.length;
  const key = formatKeyForStorage(category, text);  
  const setInternalCategory = (category) => {
    dispatch(setCategory(category));
  };

  const restartFields = (value) => {
    dispatch(setText(value.replace(/[^a-zA-Z0-9 ]/g, "")));
    dispatch(restartProducts());
  }

  const fetchProducts = async (e) => {
     e.preventDefault();
     dispatch(restartProducts());
     dispatch(setLoading(true));
     dispatch(setSearching(true));
     const {localData, data, saveOnStorage} = localDataExists(key, false);
     if(localData){
      printDBStorageData(data, saveOnStorage);
      dispatch(setSearching(false));  
     }
     else{
        const dbData = await getSearchDataFromDataBase(key);
        const existsOnDB =  dbData.dataBaseData;
        
        if(existsOnDB){
          printDBStorageData(dbData.data, saveOnStorage);
        }else{
          STORE_BY_CATEGORY.filter((item)=> item.category == category)[0].stores.map((storeID) => {
            fetchWithTimeout(`/api/search/${storeID}/${text.replace(" ", "+")}`).then(r => r.json()).then((data)=> processIndividualResponse(data, saveOnStorage, false, false)).catch((error)=>processIndividualResponse(error, saveOnStorage, false, true));
          }) 
        }
     }
}

const printDBStorageData = (data, saveOnStorage)=>{
  data.forEach(element => {
    processIndividualResponse(element, saveOnStorage, true);
  });
}

const processIndividualResponse =(response, saveOnStorage, saveOnDatabase, error = false)=>{
  dispatch(setLoading(false));
  searchCounter = searchCounter + 1;

  if (!error) {
    dispatch(pushProduct(response));
    if (!saveOnStorage)
      setStorageData(formatKeyForStorage(category, text), response);
  }
  
  if((searchCounter == storeToSearhCount) && !saveOnDatabase){
      dispatch(setSearching(false));  
      saveSearchOnDB(key);
    }
}

  return (
      <div className="mb-1 w-full sm:w-1/2 justify-center mr-4 ml-4">
        <form onSubmit={fetchProducts} className="grid place-items-center w-full">
            <div className="grid grid-cols-1 grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 gap-0 w-full lg:grid-cols-[30%_70%]">
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
            </div>
            <div className="grid grid-cols-1 grid-rows-1 w-full">
              <AutoCompletableList text={text}/>
            </div>
        </form>
      </div>
    
  )
}

export default SearchButton;