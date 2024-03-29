"use client";
import HorizontalItemList from "@components/HorizontalItemList";
import { fetchWithTimeout } from "@utils/functions";
import { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState({});
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

  if(loading)
    return <div className="bg-transparent"> cargando datos....</div>
  return (
    <div className="w-full">
      <HorizontalItemList companyLogo={""} companyProducts={data}/>      
    </div>
  );
};

export default Home;
