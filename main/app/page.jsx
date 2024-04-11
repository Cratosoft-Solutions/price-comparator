"use client";
import BTNPublish from "@components/BTNPublish";
import HorizontalItemList from "@components/HorizontalItemList";
import HorizontalMainInfo from "@components/HorizontalMainInfo";
import HorizontalSlider from "@components/HorizontalSlider";
import HorizontalMostSearchedList from "@components/HorizontalMostSearchedList";
import { fetchWithTimeout } from "@utils/functions";
import { useEffect, useState } from "react";


const Home = () => {
  const [data, setData] = useState(null);
  const [mostSearchedData, setMostSearchedData] = useState({});
  const [loadingPromotions, setLoadingPromotions] = useState(true);
  const [loadingMostSearched, setLoadingMostSearched] = useState(true);


  useEffect(() => {
    const executeSearch = async () => {
      await fetchWithTimeout(`/api/search/local/data/promotions`)
        .then((r) => r.json())
        .then((data) => {
          setData(data.companyProducts);
          setLoadingPromotions(false);
        })
        .catch((error) => setLoadingPromotions(false));
    };

    const executeMostSearched = async () => {
      await fetchWithTimeout(`/api/search/local/data/dailySearches`)
        .then((r) => r.json())
        .then((mostSearchedData) => {
          setMostSearchedData(mostSearchedData.companyProducts);
          setLoadingMostSearched(false);
        })
        .catch((error) => setLoadingMostSearched(false));
    };

    executeSearch();
    executeMostSearched();
  }, []);

  return (
    <div className="w-full gap-2">
      <div className="w-full mb-4 relative">
        <HorizontalSlider/>
      </div>
      <div className="w-full mb-4">
        {!loadingPromotions && data && data.length > 0 &&
          <HorizontalItemList companyLogo={""} companyProducts={data}/>
        } 
      </div>
      <div className="w-full mb-4 relative">
        <HorizontalMainInfo/> 
      </div>      
      <div className="w-full mb-4 relative">
        <BTNPublish/> 
      </div>  
      <div className="w-full mb-4 relative">
        {!loadingMostSearched && mostSearchedData && mostSearchedData.length > 0 &&
          <HorizontalMostSearchedList companyLogo={""} companyProducts={mostSearchedData}/> 
        } 
      </div> 
    </div>
  );
};

export default Home;
