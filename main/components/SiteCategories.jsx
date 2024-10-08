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
          <div className={`text-black flex justify-start h-full items-center hover:cursor-pointer hover:font-bold`} onClick={()=>{onSelectedCategory("PRODUCT")}}>Productos</div>  
          <div className={`text-black flex justify-start h-full items-center hover:cursor-pointer hover:font-bold`}onClick={()=>{onSelectedCategory("CAR")}}>Autos</div>  
          <div className={`text-black flex justify-start h-full items-center hover:cursor-pointer hover:font-bold`}onClick={()=>{onSelectedCategory("HOUSES")}}>Casas & Apartamentos</div>  
          <div className={`text-black flex justify-start h-full items-center hover:cursor-pointer hover:font-bold`} onClick={()=>{onSelectedCategory("SERVICES")}}>Servicios</div>   
        </>
  )
}

export default SiteCategories