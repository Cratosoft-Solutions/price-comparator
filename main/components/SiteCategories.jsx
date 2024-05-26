import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from '@app/redux/slices/siteNav';
import { useRouter } from 'next/navigation';

const SiteCategories = () => {
  const dispatch = useDispatch();
  const { category} = useSelector(state => state.siteNav);
  const router = useRouter();

  const onSelectedCategory = (categoryToSet) => {
    dispatch(setCategory(categoryToSet));
    router.push("/");
  }

  return (
        <>
          <div className={`flex justify-start h-10 items-center ${category=="PRODUCT"?'font-black':''}`} onClick={()=>{onSelectedCategory("PRODUCT")}}>Productos</div>  
          <div className={`flex justify-start h-10 items-center ${category=="CAR"?'font-black':''}`}onClick={()=>{onSelectedCategory("CAR")}}>Autos</div>  
          <div className={`flex justify-start h-10 items-center ${category=="HOUSES"?'font-black':''}`}onClick={()=>{onSelectedCategory("HOUSES")}}>Casas & Apartamentos</div>  
          <div className={`flex justify-start h-10 items-center ${category=="SERVICES"?'font-black':''}`} onClick={()=>{onSelectedCategory("SERVICES")}}>Servicios</div>   
        </>
  )
}

export default SiteCategories