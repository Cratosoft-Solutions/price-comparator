"use client";
import ProductList from '@components/ProductList';
import ProductFilterVerticalNav from '@components/ProductFilterVerticalNav'
import React, { useEffect } from 'react'
import { STORE_BY_CATEGORY } from "@utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { fetchWithTimeout, formatKeyForStorage, getSearchDataFromDataBase, localDataExists, saveSearchOnDB, setStorageData } from "@utils/functions";
import { pushProduct, restartProducts, setMatchedProducts } from "@app/redux/slices/products";
import { setLoading } from "@app/redux/slices/loading";
import { setSearching } from "@app/redux/slices/searching";
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation'



const MyResults = () => {
    const router = useRouter();
    const {data:session} = useSession();
    const { expandedNavBar } = useSelector(state => state.verticalnav.productSearch);
    const dispatch = useDispatch();
    const { text } = useSelector(state => state.searchProperties.properties);
    const { category} = useSelector(state => state.siteNav);
    const searchParams = useSearchParams()
    const search = searchParams.get('search');
  

    let searchCounter = 0;
    //let storeToSearhCount = STORE_BY_CATEGORY.filter((item)=> item.category == category)[0]?.stores.length;
    let storeToSearhCount = STORE_BY_CATEGORY[0].stores.length;//TODO cuando se manejen categorias por producto
    const key = formatKeyForStorage(category, text); 
    const textSearchArray = key != '' ? key.toUpperCase().split(" ") : "";

    const processIndividualResponse = (response, isSavedOnStorage, isSavedOnDatabase, error = false)=>{ 
        searchCounter = searchCounter + 1;
        dispatch(setMatchedProducts(textSearchArray));
        if(error && searchCounter == storeToSearhCount){
          dispatch(setLoading(false));
        }
     
        if (!error && response.companyProducts.length > 0) {
          dispatch(setLoading(false));
          dispatch(pushProduct(response));
          if (!isSavedOnStorage && category === 'PRODUCT'){
            console.log("Save on storage")
            setStorageData(key, response);
          }
        }
        
        if(searchCounter == storeToSearhCount){
            dispatch(setLoading(false)); 
            if(!isSavedOnDatabase && category === 'PRODUCT') {
              console.log("Storing information in mongo")
              saveSearchOnDB(key);
            }
          }
      }

      const printDBStorageData = (data, isSavedOnStorage)=>{
        data.forEach(element => {
          processIndividualResponse(element, isSavedOnStorage, true);
        });
      }

    const setInternalSearching = () => {
        dispatch(setSearching(false))
    }

    const triggerScrap =(isSavedOnStorage)=>{
      console.log("Starting scraping");
        STORE_BY_CATEGORY[0]/*.filter(
          (item) => item.category == category
        )[0]*/.stores.map((storeID) => {
          fetchWithTimeout(
            `/api/search/${storeID}/${key.replace(" ", "+")}`
          )
            .then((r) => r.json())
            .then((data) =>
              processIndividualResponse(
                data,
                isSavedOnStorage,
                false,
                false
              )
            )
            .catch((error) =>
              processIndividualResponse(
                error,
                isSavedOnStorage,
                false,
                true
              )
            );
        });
    }

    const triggerLocalSearch =(isSavedOnStorage)=>{
      fetchWithTimeout(
        `/api/search/local/${category +"&"+ text.replace(" ", "+")}`
      )
        .then((r) => r.json())
        .then((data) =>
          processIndividualResponse(
            data,
            isSavedOnStorage,
            false,
            false
          )
        )
        .catch((error) =>
          processIndividualResponse(
            error,
            isSavedOnStorage,
            false,
            true
          )
        );
    }

    useEffect(()=>{
        const executeSearch = async () =>{
          if (key === '') {
            dispatch(setSearching(false));  
          }else{
            setTimeout(setInternalSearching, 15000);
            dispatch(restartProducts());
            dispatch(setLoading(true));
            dispatch(setSearching(true));
            const {localData, data, isSavedOnStorage} = localDataExists(key, false);
            if(localData){
             console.log("Getting information from session")
             printDBStorageData(data, isSavedOnStorage);
             dispatch(setSearching(false));  
            }
            else{
              let existsOnDB;
              // Load searches only for scrapping in product category
              if (category === "PRODUCT") {
                console.log("Going to search info in mongo");
                const dbData = await getSearchDataFromDataBase(
                  key,
                  session?.user?.email
                );
                existsOnDB = dbData && dbData.dataBaseData;
                if (existsOnDB) {
                  dispatch(setSearching(false));
                  printDBStorageData(dbData.data, isSavedOnStorage);
                } else {
                  triggerScrap(isSavedOnStorage);
                }
                //   }
              } else {
                triggerLocalSearch(isSavedOnStorage);
              }
            }
          }
        }
        if(key != text || key != ''){ 
          executeSearch();
        }
        else{
          router.push('/');
        }
    }, [search])


return (
    <div className='bg-white'>
      <ProductFilterVerticalNav />
      <ProductList isOptionSearchExpanded={expandedNavBar}/>
    </div> 
  ) 
}

export default MyResults;