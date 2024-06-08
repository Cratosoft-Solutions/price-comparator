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
import { DEFAULT_ITEMS_INFORMATION } from "@utils/constants";
import BTNPublishWithImage from "@components/BTNPublishWithImage";


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
    const arrayToReturn = dataToFilter.filter((productTemp) => productTemp.category === category);

    if(arrayToReturn.length < 1){
      return addDefaultPromotedCard(dataToFilter);
    } else{
      return addDefaultPromotedCard(arrayToReturn);
    }

  } catch (error) {
   return []; 
  }
  }


  const addDefaultPromotedCard =(data)=>{
    const dataToReturn = data;
    DEFAULT_ITEMS_INFORMATION.forEach(element => {
      dataToReturn.push(element);
    });
    return dataToReturn;
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
      <div className="w-full md:mb-16 relative">
        <HorizontalSlider/>
      </div>    
      <div className="w-full mb-4">
        {!loadingPromotions && data && data.length > 0 &&
          <HorizontalItemList companyLogo={""} companyProducts={dataByCategory}/>
        } 
      </div>
      <div className="w-full mb-16 relative">
        <SearchButton behaviour={{size:'w-5/6 md:w-1/2', height:"h-20", fSize:"text-2xl", placeHolderColor:'placeholder-white', placeHolderText:'placeholder:text-center', iconSearchColor:'white',bgColor:'bg-transparent', displayImage:true, textColor:'text-white', borderColor:'border-neutral-50', borderType:'rounded', style:{backgroundImage:  "url('./assets/images/ecommerce2.jpg')", backgroundSize:"100% 100%"}}}/> 
      </div>

      <div className="w-full mb-4 relative">
        {!loadingMostSearched && mostSearchedData && mostSearchedData.length > 0 &&
          <HorizontalMostSearchedList companyLogo={""} companyProducts={mostSearchedDataByCategory}/> 
        } 
      </div> 
      <div className="w-full mb-16 relative">
        <BTNPublishWithImage/> 
      </div> 
      <div className="w-full mb-4 relative">
        <HorizontalMainInfo/> 
      </div>      
 

    </div>
  );
};

export default Home;
