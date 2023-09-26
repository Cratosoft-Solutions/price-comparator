"use client";
import ProductList from '@components/ProductList';
import SearchOptions from '@components/SearchOptions'
import React, { useEffect, useState } from 'react'
import { STORE_BY_CATEGORY } from "@utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { fetchWithTimeout, formatKeyForStorage, getSearchDataFromDataBase, localDataExists, saveSearchOnDB, setStorageData } from "@utils/functions";
import { pushProduct, restartProducts } from "@app/redux/slices/products";
import { setLoading } from "@app/redux/slices/loading";
import { setSearching } from "@app/redux/slices/searching";
import { useRouter } from 'next/navigation';


const MyResults = () => {
    const router = useRouter();
    const [isOptionSearchExpanded, setIsOptionSearchExpanded] = useState(false); 
    const dispatch = useDispatch();
    const { text, category } = useSelector(state => state.searchProperties.properties)
    let searchCounter = 0;
    let storeToSearhCount = STORE_BY_CATEGORY.filter((item)=> item.category == category)[0]?.stores.length;
    const key = formatKeyForStorage(category, text);  
    
    const processIndividualResponse = (response, saveOnStorage, saveOnDatabase, error = false)=>{
  
        searchCounter = searchCounter + 1;
      
        if(error && searchCounter == storeToSearhCount){
          dispatch(setLoading(false));
        }
      
        if (!error && response.companyProducts.length > 0) {
          dispatch(setLoading(false));
          dispatch(pushProduct(response));
          if (!saveOnStorage)
            setStorageData(formatKeyForStorage(category, text), response);
        }
        
        if(searchCounter == storeToSearhCount){
            dispatch(setLoading(false)); 
            if(!saveOnDatabase) 
              saveSearchOnDB(key);
          }
      }

      const printDBStorageData = (data, saveOnStorage)=>{
        data.forEach(element => {
          processIndividualResponse(element, saveOnStorage, true);
        });
      }

    const setInternalSearching = () => {
        dispatch(setSearching(false))
    }


    useEffect(()=>{
        const executeSearch = async () =>{
                setTimeout(setInternalSearching, 15000);
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
                     dispatch(setSearching(false));  
                     printDBStorageData(dbData.data, saveOnStorage);
                   }else{
                     STORE_BY_CATEGORY.filter((item)=> item.category == category)[0].stores.map((storeID) => {
                       fetchWithTimeout(`/api/search/${storeID}/${text.replace(" ", "+")}`).then(r => r.json()).then((data)=> processIndividualResponse(data, saveOnStorage, false, false)).catch((error)=>processIndividualResponse(error, saveOnStorage, false, true));
                     }) 
                   }
                }
        }
        if(text != "NO_TEXT"){ 
          executeSearch();
        }else{
          router.push('/search/newsearch');
        }
    }, [])
    


return (
    <>
      <SearchOptions setOptionSearch={setIsOptionSearchExpanded}/>
      <ProductList isOptionSearchExpanded={isOptionSearchExpanded}/>
    </>
  )
}

export default MyResults;