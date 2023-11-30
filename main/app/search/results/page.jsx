"use client";
import ProductList from '@components/ProductList';
import SearchOptions from '@components/SearchOptions'
import React, { useEffect, useState } from 'react'
import { STORE_BY_CATEGORY } from "@utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { fetchWithTimeout, formatKeyForStorage, getSearchDataFromDataBase, localDataExists, saveSearchOnDB, setStorageData } from "@utils/functions";
import { pushProduct, restartProducts, setMatchedProducts } from "@app/redux/slices/products";
import { setLoading } from "@app/redux/slices/loading";
import { setSearching } from "@app/redux/slices/searching";
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';


const MyResults = () => {
    const router = useRouter();
    const {data:session} = useSession();
    const [isOptionSearchExpanded, setIsOptionSearchExpanded] = useState(false); 
    const dispatch = useDispatch();
    const { text, category } = useSelector(state => state.searchProperties.properties);

    let searchCounter = 0;
    let storeToSearhCount = STORE_BY_CATEGORY.filter((item)=> item.category == category)[0]?.stores.length;
    const key = formatKeyForStorage(category, text); 
    const textSearchArray = text.toUpperCase().split(" ");

    const processIndividualResponse = (response, saveOnStorage, saveOnDatabase, error = false)=>{
  
        searchCounter = searchCounter + 1;
        dispatch(setMatchedProducts(textSearchArray));
        if(error && searchCounter == storeToSearhCount){
          dispatch(setLoading(false));
        }
      
        if (!error && response.companyProducts.length > 0) {
          dispatch(setLoading(false));
          dispatch(pushProduct(response));
          if (!saveOnStorage)
            console.log("Save on storage")
            setStorageData(formatKeyForStorage(category, text), response);
        }
        
        if(searchCounter == storeToSearhCount){
            dispatch(setLoading(false)); 
            if(!saveOnDatabase) 
            console.log("Storing information in mongo")
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
                 console.log("Getting information from session")
                 printDBStorageData(data, saveOnStorage);
                 dispatch(setSearching(false));  
                }
                else{
                  console.log("Going to search info in mongo")
                   const dbData = await getSearchDataFromDataBase(key, session?.user?.email);
                   const existsOnDB =  dbData.dataBaseData;
                   
                   if(existsOnDB){
                     console.log("Info exists in mongo")
                     dispatch(setSearching(false));  
                     printDBStorageData(dbData.data, saveOnStorage);
                   }else{
                    console.log("Starting scraping")
                     STORE_BY_CATEGORY.filter((item)=> item.category == category)[0].stores
                     .map((storeID) => {
                       fetchWithTimeout(`/api/search/${storeID}/${text.replace(" ", "+")}`)
                       .then(r => r.json())
                       .then((data)=> processIndividualResponse(data, saveOnStorage, false, false))
                       .catch((error)=>processIndividualResponse(error, saveOnStorage, false, true));
                     }) 
                   }
                }
        }
          if(text != ''){ 
          executeSearch();
        }else{
          router.push('/search/newsearch');
        }
    }, [])
    


return (
    <div className='bg-gray-100 '>
      <SearchOptions setOptionSearch={setIsOptionSearchExpanded}/>
      <ProductList isOptionSearchExpanded={isOptionSearchExpanded}/>
    </div> 
  ) 
}

export default MyResults;