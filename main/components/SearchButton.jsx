"use client";

import { useState } from "react";

  const SearchButton = ({onTextEntered, onSetData, onSetLoading, onRestartData}) => {
  const [serchText, setSearchText] = useState('');
  const restartFields = (value) =>{
    onTextEntered(value);
    setSearchText(value);
    onRestartData([]);
  }

  const fetchProducts = async (e) => {
    e.preventDefault();
     onSetLoading(true);
     for (let index = 1; index < 27; index++) {
        fetch(`/api/search/${index}/${serchText.replace(" ", "+")}`).then(r => r.json()).then((data)=> processIndividualResponse(data)).catch((error)=>processIndividualError(error));
     }

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
        <form onSubmit={fetchProducts}>
          <div className="mb-4 flex w-full flex-wrap items-stretch justify-center">
            <input
              type="search"
              className="block w-full h-16 px-4 py-2 text-gray-400 bg-white border rounded-full focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Buscar"
              aria-label="Search"
              aria-describedby="button-addon3" 
              onChange={(e)=>{restartFields(e.target.value)}}
              />
               <input
                type="submit"
                className="bg-black text-white rounded-full mt-4 h-14 w-64 text-lg"
                value="Buscar Productos"
              />
          </div>
        </form>
      </div>
    
  )
}

export default SearchButton;