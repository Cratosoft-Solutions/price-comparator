"use client"
import React from 'react';
import { useRouter } from "next/navigation";


const SiteFooter = ({showOnNav}) => {
const router = useRouter();

const onOptionSelected =(url)=>{
  router.push(url);
}
  return (
    <div className='w-full bg-[#222222] h-26 mt-auto grid grid-rows-3 justify-center p-2'>
      <div  className='flex justify-center items-center'>
        <span className='text-white font-black text-2xl h-10 mt-8'>
          Encuéntralo Fácil
        </span>
      </div>
      <div className='grid grid-rows-2 grid-cols-2 lg:grid-rows-1 lg:grid-cols-3 w-full'>
        <button onClick={()=>{onOptionSelected("/sale")}} className='text-gray-400 w-full justify-center flex'>
          Publica tu producto o servicio
        </button>
        <button onClick={()=>{onOptionSelected("/promotion")}} className='text-gray-400  w-full justify-center flex'>
          Promociona tu sitio web
        </button>
        <button onClick={()=>{onOptionSelected("/howtouse")}} className='text-gray-400  w-full justify-center flex'>
          ¿Cómo funciona?
        </button>
      </div>
      <div className='flex justify-center w-full items-center'>
        <span className="text-gray-400  w-full justify-center flex">
          @2024-2025  encuetralofacilcr.com / Todos los derechos reservados
        </span>
      </div>
    </div>
  )
}

export default SiteFooter