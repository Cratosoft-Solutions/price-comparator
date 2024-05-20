"use client";
import BTNPublish from "@components/BTNPublish";
import HorizontalItemList from "@components/HorizontalItemList";
import HorizontalMainInfo from "@components/HorizontalMainInfo";
import HorizontalSlider from "@components/HorizontalSlider";
import HorizontalMostSearchedList from "@components/HorizontalMostSearchedList";
import { fetchWithTimeout } from "@utils/functions";
import { useEffect, useState } from "react";
import SearchButton from "@components/SearchButton";
import { useSelector } from "react-redux";


const Home = () => {
  const [data, setData] = useState(null);
  const [dataByCategory, setDataByCategory] = useState(null);
  const [mostSearchedData, setMostSearchedData] = useState({});
  const [mostSearchedDataByCategory, setMostSearchedDataByCategory] = useState({});
  const [loadingPromotions, setLoadingPromotions] = useState(true);
  const [loadingMostSearched, setLoadingMostSearched] = useState(true);
  const { category} = useSelector(state => state.siteNav);


  const filterItems = (dataToFilter) => {
   try {
    const arrayToReturn =   dataToFilter.filter((productTemp) => productTemp.category === category);

    if(arrayToReturn.length < 1){
      return dataToFilter;
    } else{
      return arrayToReturn;
    }

  } catch (error) {
   return []; 
  }
  }

  useEffect(() => {
    const executeSearch = async () => {
      await fetchWithTimeout(`/api/search/local/data/promotions`)
        .then((r) => r.json())
        .then((data) => {
          setData(data.companyProducts);
          setDataByCategory(filterItems(data.companyProducts));          
          setLoadingPromotions(false);
        })
        .catch((error) => setLoadingPromotions(false));
    };

    const executeMostSearched = async () => {
      await fetchWithTimeout(`/api/search/local/data/dailySearches`)
        .then((r) => r.json())
        .then((mostSearchedData) => {
          setMostSearchedData(mostSearchedData.companyProducts);
          setMostSearchedDataByCategory(filterItems(mostSearchedData.companyProducts));          
          setLoadingMostSearched(false);
        })
        .catch((error) => setLoadingMostSearched(false));
    };

    executeSearch();
    executeMostSearched();
  }, []);

  useEffect(()=>{
    setDataByCategory(filterItems(data));
    setMostSearchedDataByCategory(filterItems(mostSearchedData));
  }, [category]);


  return (
    <div className="w-full gap-2">
      <div className="w-full mb-4 relative">
        <HorizontalSlider/>
      </div>    
      <div className="w-full mb-4">
        {!loadingPromotions && data && data.length > 0 &&
          <HorizontalItemList companyLogo={""} companyProducts={dataByCategory}/>
        } 
      </div>
      <div className="w-full mb-16 relative">
        <SearchButton behaviour={{size:'w-1/2', height:"h-20", fSize:"text-2xl"}}/> 
      </div>
      <div className="w-full mb-4 relative">
        <HorizontalMainInfo/> 
      </div>      
      <div className="w-full mb-4 relative">
        <BTNPublish/> 
      </div>  
      <div className="w-full mb-4 relative">
        {!loadingMostSearched && mostSearchedData && mostSearchedData.length > 0 &&
          <HorizontalMostSearchedList companyLogo={""} companyProducts={mostSearchedDataByCategory}/> 
        } 
      </div> 
    </div>
  );
};

export default Home;
