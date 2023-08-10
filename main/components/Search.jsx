"use client";
import React, {useState} from 'react'
import SearchButton from './SearchButton';
import ProductList from './ProductList';
import { comparePrice } from '@utils/functions';
import SearchOptions from './SearchOptions';
import { SEARCH_DEFAULT_OPTIONS } from '@utils/constants';

const Search = () => {
  const [storeFullData, setStoreFullData] = useState([]);
  const [storeFullProducts, setStoreFullProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchConfigOptions, setSearchConfigOptions] = useState(SEARCH_DEFAULT_OPTIONS);

  const setRetrievedData = (dataToSet) =>{
    dataToSet.forEach(element => {
      setStoreFullData(oldArray => [...oldArray, element]);
      mergeStoreProducts(element.companyProducts);
    });    
  }

  const mergeStoreProducts = (productArray)=>{
    productArray.forEach((productElement)=> {
      setStoreFullProducts(oldArray => [...oldArray, productElement]);
    })
  }

  const onSetSearchConfig = (configOption)=>{
    let configOptions = SEARCH_DEFAULT_OPTIONS;
    switch (configOption) {
      case "GROUPBYSTORE":
        setSearchConfigOptions({...searchConfigOptions, GROUPBYSTORE:true});   
        break;
      case "NOTGROUPBYSTORE":
        setSearchConfigOptions({...searchConfigOptions, GROUPBYSTORE:false});   
        break;  
      case "MINTOMAX":
        configOptions.MINTOMAX = true;
        break;
      case "MAXTOMIN":
        configOptions.MAXTOMIN = true;
        break;
      case "MATCH":
        configOptions.MATCH = true;      
        break;
    }
  }

  return (
    <>
      <section className="grid grid-cols-1 grid-rows-2 w-full">
        <h1 className="flex w-full justify-center font-bold p-4">
          <span className="orange_gradient text-center text-4xl lg:text-7xl ">Compara Elige Ahorra</span>
        </h1>
        <div className="flex w-full justify-center">
          <SearchButton 
            onSetData={setRetrievedData}
            onRestartData={setStoreFullData}
            onSetLoading={setLoading}
          />
        </div>
      </section>
      {storeFullData.length > 0 && <SearchOptions searchConfigOptions={searchConfigOptions} onSetSearchConfig={onSetSearchConfig}/>}
      <ProductList searchConfigOptions={searchConfigOptions} storeFullData={storeFullData} mergedProducts={storeFullProducts.sort(comparePrice("formatedPrice"))} loading={loading} />
    </>
  );
}

export default Search;
