"use client";

import DropDownList from "./DropDownList";
import { CATEGORIES, STORE_BY_CATEGORY } from "@utils/constants";
import { fetchWithTimeout, formatKeyForStorage, getSearchDataFromDataBase, localDataExists, saveSearchOnDB, setStorageData } from "@utils/functions";
import { useDispatch, useSelector } from "react-redux";
import { pushProduct, restartProducts } from "@app/redux/slices/products";
import { setLoading } from "@app/redux/slices/loading";
import { setText, setCategory } from "@app/redux/slices/searchProperties";
import { useState } from "react";


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
     const {localData, data, saveOnStorage} = localDataExists(key, false);
     if(localData){
      printDBStorageData(data, saveOnStorage);
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
  
  if((searchCounter == storeToSearhCount) && !saveOnDatabase)
    saveSearchOnDB(key);
}

  return (
      <div className="mb-1 w-full sm:w-1/2 pl-4 pr-4 justify-center">
        <form onSubmit={fetchProducts} className="grid place-items-center w-full">
            <div className="grid grid-cols-1 grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 gap-0 w-full lg:grid-cols-[25%_75%]">
              <DropDownList values={CATEGORIES} onSelectValue={setInternalCategory} currentValue={category} />
              <input
                type="search"
                className="block w-full h-16 px-4 py-2 text-gray-400 bg-white border focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Buscar"
                aria-label="Search"
                aria-describedby="button-addon3" 
                onChange={(e)=>{restartFields(e.target.value)}}
                value={text}
                />
            </div>
               <input
                disabled={category == CATEGORIES[0].value || text.length < 3}
                type="submit"
                className="bg-black text-white rounded-full mt-4 h-14 w-64 text-lg"
                value="Buscar Productos"
              />
        </form>
      </div>
    
  )
}

export default SearchButton;