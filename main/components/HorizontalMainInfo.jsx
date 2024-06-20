import React from 'react';
import { FaColonSign } from "react-icons/fa6";
import MainInfoCard from './MainInfoCard';
import { MAIN_PAGE_INFO_CARD } from '@utils/constants';


const HorizontalMainInfo = () => {
  return (
    <div className='mr-2 ml-2 lg:mr-10 lg:ml-10'>
        <div className="w-full mb-12 "><span className="text-black font-[1000] text-2xl mt-6 flex text-center justify-center w-full ">¿Por qué anunciarme con EncuentraloFácilCR?</span></div>
        <div className='grid grid-rows-auto grid-cols-1 md:grid-cols-2 w-full '>
        {MAIN_PAGE_INFO_CARD.map((element)=>(
                <MainInfoCard Icon={element.icon} title={element.title} description={element.description}/>
        ))}
        </div>
    </div>
  )
}

export default HorizontalMainInfo