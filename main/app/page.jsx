"use client";
import BTNPublish from "@components/BTNPublish";
import HorizontalItemList from "@components/HorizontalItemList";
import HorizontalMainInfo from "@components/HorizontalMainInfo";
import HorizontalSlider from "@components/HorizontalSlider";
import { fetchWithTimeout } from "@utils/functions";
import { useEffect, useState } from "react";
import { FaRegHandPointUp } from "react-icons/fa";


const Home = () => {
  const [data, setData] = useState(null);
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
    executeSearch();
  }, []);

  return (
    <div className="w-full gap-2">
      <div className="w-full mb-4 relative">
        <HorizontalSlider/>
      </div>
      <div className="w-full mb-4">
        {!loading && data && data.length > 0 &&
          <HorizontalItemList companyLogo={""} companyProducts={data}/>
        } 
      </div>
      <div className="w-full mb-4 relative">
        <HorizontalMainInfo/> 
      </div>      
      <div className="w-full mb-4 relative">
        <BTNPublish/> 
      </div>  
    </div>
  );
};

export default Home;
