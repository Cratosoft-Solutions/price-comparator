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
          <div className={`text-black flex justify-start h-full items-center hover:cursor-pointer ${category=="PRODUCT"?'font-black  p-2 rounded':''}`} onClick={()=>{onSelectedCategory("PRODUCT")}}>Productos</div>  
          <div className={`text-black flex justify-start h-full items-center hover:cursor-pointer  ${category=="CAR"?'font-black    p-2 rounded':''}`}onClick={()=>{onSelectedCategory("CAR")}}>Autos</div>  
          <div className={`text-black flex justify-start h-full items-center hover:cursor-pointer  ${category=="HOUSES"?'font-black   p-2 rounded':''}`}onClick={()=>{onSelectedCategory("HOUSES")}}>Casas & Apartamentos</div>  
          <div className={`text-black flex justify-start h-full items-center hover:cursor-pointer  ${category=="SERVICES"?'font-black  p-2 rounded':''}`} onClick={()=>{onSelectedCategory("SERVICES")}}>Servicios</div>   
        </>
  )
}

export default SiteCategories