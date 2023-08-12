"use client";

import { useState } from "react";
import DropDownList from "./DropDownList";
import { CATEGORIES, STORE_BY_CATEGORY } from "@utils/constants";
import { fetchWithTimeout } from "@utils/functions";

  const SearchButton = ({onTextEntered, onSetData, onSetLoading, onRestartData, showSearchButton}) => {
  const [serchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0].value);
  const restartFields = (value) =>{
    onTextEntered(value);
    setSearchText(value);
    onRestartData([]);
  }

  const fetchProducts = async (e) => {
    e.preventDefault();
     onSetLoading(true);
     STORE_BY_CATEGORY.filter((item)=> item.category == selectedCategory)[0].stores.map((storeID)=>{
      fetchWithTimeout(`/api/search/${storeID}/${serchText.replace(" ", "+")}`).then(r => r.json()).then((data)=> processIndividualResponse(data)).catch((error)=>processIndividualError(error));
    }) 
}

const processIndividualResponse =(response)=>{
  onSetLoading(false);
  console.log(response);
  onSetData(response);
}

const processIndividualError =(error)=>{
  console.log(error);
}

  return (
    
      <div className="mb-1 w-full sm:w-1/2 pl-4 pr-4 justify-center">
        <form onSubmit={fetchProducts} className="grid place-items-center w-full">
            <div className="grid grid-cols-1 grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 gap-0 w-full lg:grid-cols-[25%_75%]">
              <DropDownList values={CATEGORIES} onSelectValue={setSelectedCategory} currentValue={selectedCategory} />
              <input
                type="search"
                className="block w-full h-16 px-4 py-2 text-gray-400 bg-white border focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Buscar"
                aria-label="Search"
                aria-describedby="button-addon3" 
                onChange={(e)=>{restartFields(e.target.value)}}
                />
            </div>
               <input
                disabled={selectedCategory == CATEGORIES[0].value || serchText.length < 3}
                type="submit"
                className={`bg-black text-white ${showSearchButton?'block':'hidden'} rounded-full mt-4 h-14 w-64 text-lg`}
                value="Buscar Productos"
              />
        </form>
      </div>
    
  )
}

export default SearchButton;