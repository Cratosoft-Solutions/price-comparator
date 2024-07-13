import React from 'react';
import { FaColonSign } from "react-icons/fa6";
import MainInfoCard from './MainInfoCard';
import { MAIN_PAGE_INFO_CARD } from '@utils/constants';


const HorizontalMainInfo = () => {
  return (
    <div className='bg-[#EEDECF] p-4 lg:pr-14 lg:pl-14'>
        <div className="w-full mb-12"><span className="text-black font-black text-2xl lg:text-5xl  flex text-center justify-center w-full ">¿Beneficios?</span></div>
        <div className='grid grid-rows-auto grid-cols-1 lg:grid-cols-2 w-full gap-8 '>
        {MAIN_PAGE_INFO_CARD.map((element, index)=>(
                <MainInfoCard key={index} Icon={element.icon} title={element.title} description={element.description} index={index}/>
        ))}
        </div>
    </div>
  )
}

export default HorizontalMainInfo