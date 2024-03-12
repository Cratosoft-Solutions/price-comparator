import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from '@app/redux/slices/siteNav';

const SiteCategories = () => {
  const dispatch = useDispatch();
  const { category} = useSelector(state => state.siteNav);


  return (
        <>
          <div className={`flex justify-start h-10 items-center ${category=="PRODUCT"?'font-black':''}`} onClick={()=>{dispatch(setCategory("PRODUCT"))}}>Productos</div>  
          <div className={`flex justify-start h-10 items-center ${category=="CAR"?'font-black':''}`}onClick={()=>{dispatch(setCategory("CAR"))}}>Autos</div>  
          <div className={`flex justify-start h-10 items-center ${category=="HOUSE"?'font-black':''}`}onClick={()=>{dispatch(setCategory("HOUSE"))}}>Casas & Apartamentos</div>  
          <div className={`flex justify-start h-10 items-center ${category=="SERVICES"?'font-black':''}`} onClick={()=>{dispatch(setCategory("SERVICES"))}}>Servicios</div>   
        </>
  )
}

export default SiteCategories