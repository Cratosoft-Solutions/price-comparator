"use client";

import DropDownList from "./DropDownList";
import { CATEGORIES, STORE_BY_CATEGORY } from "@utils/constants";
import { fetchWithTimeout, formatKeyForStorage, localDataExists, setStorageData } from "@utils/functions";
import { useDispatch } from "react-redux";
import { pushProduct, restartProducts } from "@app/redux/slices/products";
import { setLoading } from "@app/redux/slices/loading";

const SearchButton = ({onTextEntered, searchText, selectedCategory, onSetSelectedCategory}) => {
  const dispatch = useDispatch();
  
  const restartFields = (value) => {
    onTextEntered(value);
    dispatch(restartProducts());
  }

  const fetchProducts = async (e) => {
     e.preventDefault();
     dispatch(restartProducts());
     dispatch(setLoading(true));
     const key = formatKeyForStorage(selectedCategory, searchText);
     const {localData, data, saveOnStorage} = localDataExists(key);
     if(localData){
      data.forEach(element => {
          processIndividualResponse(element, saveOnStorage);
        });
     }else{
        STORE_BY_CATEGORY.filter((item)=> item.category == selectedCategory)[0].stores.map((storeID)=>{
          fetchWithTimeout(`/api/search/${storeID}/${searchText.replace(" ", "+")}`).then(r => r.json()).then((data)=> processIndividualResponse(data, saveOnStorage)).catch((error)=>processIndividualError(error));
        }) 
     }
}

const processIndividualResponse =(response, saveOnStorage)=>{
  dispatch(setLoading(false));
  dispatch(pushProduct(response));
  if(!saveOnStorage)
      setStorageData(formatKeyForStorage(selectedCategory, searchText), response);  
}

const processIndividualError =(error)=>{
  dispatch(setLoading(false));
}

  return (
      <div className="mb-1 w-full sm:w-1/2 pl-4 pr-4 justify-center">
        <form onSubmit={fetchProducts} className="grid place-items-center w-full">
            <div className="grid grid-cols-1 grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 gap-0 w-full lg:grid-cols-[25%_75%]">
              <DropDownList values={CATEGORIES} onSelectValue={onSetSelectedCategory} currentValue={selectedCategory} />
              <input
                type="search"
                className="block w-full h-16 px-4 py-2 text-gray-400 bg-white border focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Buscar"
                aria-label="Search"
                aria-describedby="button-addon3" 
                onChange={(e)=>{restartFields(e.target.value)}}
                value={searchText}
                />
            </div>
               <input
                disabled={selectedCategory == CATEGORIES[0].value || searchText.length < 3}
                type="submit"
                className={`bg-black text-white rounded-full mt-4 h-14 w-64 text-lg`}
                value="Buscar Productos"
              />
        </form>
      </div>
    
  )
}

export default SearchButton;