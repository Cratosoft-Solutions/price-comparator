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
  const [storeFullMatchedProducts, setStoreFullMatchedProducts] = useState([]);
  const [textSearchArray, setTextSearchArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchConfigOptions, setSearchConfigOptions] = useState(SEARCH_DEFAULT_OPTIONS);


  const setRetrievedData = (dataToSet) =>{
      setStoreFullData(oldArray => [...oldArray, dataToSet]);
      mergeStoreProducts(dataToSet.companyProducts);   
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
        setSearchConfigOptions({...searchConfigOptions, MINTOMAX:true});   
        break;
      case "MAXTOMIN":
        setSearchConfigOptions({...searchConfigOptions, MAXTOMIN:true});   
        break;
      case "MATCH":
        const filteredFinal = [];
        storeFullProducts.forEach(element=>{
            const filtered = element.productName.toUpperCase().split(" ").filter(item => textSearchArray.includes(item));
            if(filtered.length > 0)
              filteredFinal.push(element);
        })
        setStoreFullMatchedProducts(filteredFinal);
        setSearchConfigOptions({...searchConfigOptions, MATCH:!searchConfigOptions.MATCH});   
        break;
    }
  }

  const setTextArray =(searchText)=>{
    setTextSearchArray(oldArray => oldArray.concat(searchText.toUpperCase().split(" ")));
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
            onTextEntered={setTextArray}
          />
        </div>
      </section>
      {storeFullData.length > 0 && <SearchOptions searchConfigOptions={searchConfigOptions} onSetSearchConfig={onSetSearchConfig}/>}
      <ProductList searchConfigOptions={searchConfigOptions} storeFullData={storeFullData} mergedProducts={(searchConfigOptions.MATCH?storeFullMatchedProducts:storeFullProducts).sort(comparePrice("formatedPrice"))} loading={loading} />
    </>
  );
}

export default Search;
