"use client";
import HorizontalItemList from "@components/HorizontalItemList";
import HorizontalMostSearchedList from "@components/HorizontalMostSearchedList";
import { fetchWithTimeout } from "@utils/functions";
import { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState({});
  const [mostSearchedData, setMostSearchedData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const executeSearch = async () => {
      await fetchWithTimeout(`/api/search/local/data/promotions`)
        .then((r) => r.json())
        .then((data) => {
          setData(data.companyProducts);
          setLoading(false);
        })
        .catch((error) => setLoading(false));
    };

    const executeMostSearched = async () => {
      await fetchWithTimeout(`/api/search/local/data/dailySearches`)
        .then((r) => r.json())
        .then((mostSearchedData) => {
          setMostSearchedData(mostSearchedData.companyProducts);
          setLoading(false);
        })
        .catch((error) => setLoading(false));
    };

    executeSearch();
    executeMostSearched();
  }, []);

  if(loading)
    return <div className="bg-transparent"> cargando datos....</div>
  return (
    <div className="w-full">
      <HorizontalItemList companyLogo={""} companyProducts={data}/>      
      <HorizontalMostSearchedList companyLogo={""} companyProducts={mostSearchedData}/>     
    </div>  
  );
};

export default Home;
