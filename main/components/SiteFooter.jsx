"use client"
import React from 'react';
import { useRouter } from "next/navigation";


const SiteFooter = ({showOnNav}) => {
const router = useRouter();

const onOptionSelected =(url)=>{
  router.push(url);
}
  return (
    <div className='w-full bg-dark-surface h-26 mt-auto grid grid-rows-3 justify-center p-2 border-t border-dark-border'>
      <div  className='flex justify-center items-center'>
        <span className='text-dark-text font-black text-2xl h-10 mt-8'>
          Encuéntralo Fácil
        </span>
      </div>
      <div className='grid grid-rows-2 grid-cols-2 lg:grid-rows-1 lg:grid-cols-3 w-full'>
        <button onClick={()=>{onOptionSelected("/sale")}} className='text-dark-muted w-full justify-center flex hover:text-accent-glow transition-colors'>
          Publica tu producto o servicio
        </button>
        <button onClick={()=>{onOptionSelected("/promotion")}} className='text-dark-muted w-full justify-center flex hover:text-accent-glow transition-colors'>
          Promociona tu sitio web
        </button>
        <button onClick={()=>{onOptionSelected("/howtouse")}} className='text-dark-muted w-full justify-center flex hover:text-accent-glow transition-colors'>
          ¿Cómo funciona?
        </button>
      </div>
      <div className='flex justify-center w-full items-center'>
        <span className="text-dark-muted w-full justify-center flex text-sm">
          @2024-2025  encuetralofacilcr.com / Todos los derechos reservados
        </span>
      </div>
    </div>
  )
}

export default SiteFooter
