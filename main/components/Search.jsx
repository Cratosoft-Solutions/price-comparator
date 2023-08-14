"use client";
import React, {useState} from 'react'
import SearchButton from './SearchButton';
import ProductList from './ProductList';
import { comparePrice, filterArrayBySearchText, formatKeyForStorage, setStorageData } from '@utils/functions';
import SearchOptions from './SearchOptions';
import { CATEGORIES, SEARCH_DEFAULT_OPTIONS } from '@utils/constants';

const Search = () => {
  const [storeFullData, setStoreFullData] = useState([]);
  const [storeFullProducts, setStoreFullProducts] = useState([]);
  const [storeFullMatchedProducts, setStoreFullMatchedProducts] = useState([]);
  const [textSearchArray, setTextSearchArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchConfigOptions, setSearchConfigOptions] = useState(SEARCH_DEFAULT_OPTIONS);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0].value);

  const setRetrievedData = (dataToSet) =>{
      setStoreFullData(oldArray => [...oldArray, dataToSet]);
      mergeStoreProducts(dataToSet.companyProducts);
      setStorageData(formatKeyForStorage(selectedCategory, searchText), dataToSet);  
  }

  const mergeStoreProducts = (productArray)=>{
    productArray.forEach((productElement)=> {
      setStoreFullProducts(oldArray => [...oldArray, productElement]);
    })
  }

  const onSetSearchConfig = (configOption)=>{
    switch (configOption) {
      case "MINTOMAX":
        setSearchConfigOptions({...searchConfigOptions, MINTOMAX:true, MAXTOMIN:false});      
        break;
      case "MAXTOMIN":
        setSearchConfigOptions({...searchConfigOptions, MAXTOMIN:true, MINTOMAX:false});  
        break;
      case "MATCH":
        const filteredFinal = filterArrayBySearchText(storeFullProducts, textSearchArray);
        setStoreFullMatchedProducts(filteredFinal);
        setSearchConfigOptions({...searchConfigOptions, MATCH:!searchConfigOptions.MATCH});   
        break;
      case "NEWSEARCH":
        resetPage();
        break;  
    }
  }

  const resetPage =()=>{
    setStoreFullData([]);
    setStoreFullProducts([]);
    setStoreFullMatchedProducts([]);
    setSearchConfigOptions(SEARCH_DEFAULT_OPTIONS );
  }

  const setTextArray =(searchText)=>{
    setStoreFullData([]);
    setStoreFullProducts([]);
    setSearchText(searchText.replace(/[^a-zA-Z0-9 ]/g, ''));
    setTextSearchArray(searchText.toUpperCase().split(" "));
  }

  return (
    <>
      {storeFullData.length==0   && <section className="grid grid-cols-1 grid-rows-2 w-full">
        <h1 className="flex w-full justify-center font-bold p-4">
          <span className="orange_gradient text-center text-4xl lg:text-7xl ">Compara Elige Ahorra</span>
        </h1>
        <div className="flex w-full justify-center">
          <SearchButton 
            onSetData={setRetrievedData}
            onRestartData={setStoreFullData}
            onSetLoading={setLoading}
            onTextEntered={setTextArray}
            showSearchButton={storeFullData.length==0}
            searchText={searchText}
            selectedCategory={selectedCategory}
            onSetSelectedCategory={setSelectedCategory}
          />
        </div>
      </section>}

      {storeFullData.length > 0 && <SearchOptions searchConfigOptions={searchConfigOptions} onSetSearchConfig={onSetSearchConfig}/>}
      <ProductList mergedProducts={(searchConfigOptions.MATCH?storeFullMatchedProducts:storeFullProducts).sort(comparePrice("formatedPrice", searchConfigOptions.MINTOMAX?1:-1))} loading={loading} />
    </>
  );
}

export default Search;
