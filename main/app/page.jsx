"use client";
import BTNPublish from "@components/BTNPublish";
import HorizontalItemList from "@components/HorizontalItemList";
import HorizontalMainInfo from "@components/HorizontalMainInfo";
import HorizontalSlider from "@components/HorizontalSlider";
import HorizontalMostSearchedList from "@components/HorizontalMostSearchedList";
import { fetchWithTimeout, isMobile } from "@utils/functions";
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

    if(arrayToReturn.length > 4){
      return arrayToReturn;
    } else{
      return dataToFilter;
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
    <div className="w-full gap-2 bg-white">
      <div className="w-full md:mb-4 relative">
        <HorizontalSlider/>
      </div>    
      <div className="w-full mb-8">
        {!loadingPromotions && data && data.length > 0 &&
          <HorizontalItemList companyLogo={""} companyProducts={dataByCategory}/>
        } 
      </div>
      <div className="w-full mb-8 relative">
        <img className="w-full h-fit -mb-1" src={isMobile()?"/assets/images/search-image-mb.svg":"/assets/images/search-image.svg"}></img>
        <SearchButton behaviour={{size:isMobile()? ' w-full p-4':'left-40 w-1/3 p-4', height:"h-20", fSize:"text-xl", bSize:'border-1', placeHolderColor:'placeholder-gray', placeHolderText:'placeholder:text-center', iconSearchColor:'black',bgColor:'bg-white', displayImage:true, textColor:'text-black', borderColor:'border-black', borderType:'rounded', style:{backgroundColor:"#EDEEF2", position:"relative"}}}/> 
      </div>

      <div className="w-full mb-4 relative">
        {!loadingMostSearched && mostSearchedData && mostSearchedData.length > 0 &&
          <HorizontalMostSearchedList companyLogo={""} companyProducts={mostSearchedDataByCategory}/> 
        } 
      </div> 
      <div className="w-full mb-4 relative">
        <BTNPublishWithImage/> 
      </div> 
      <div className="w-full mb-4 relative">
        <HorizontalMainInfo/> 
      </div>      
 

    </div>
  );
};

export default Home;
