"use client";
import React from 'react';
import {PROMOTIONS} from '@utils/constants';
import GenericAccordion from '@components/GenericAccordion';
import { MdOutlineArrowRight } from 'react-icons/md';

const PromotedOptions = ({ onSelectedOption }) => {

  return ( <>
            <div className="md:col-span-5 text-right relative mt-6">
                <div className="inline flex items-center mb-4">
                  <MdOutlineArrowRight className="-ml-4 hidden md:block inline w-12 h-12" color="black"/>
                  <p className="inline text-black w-full text-center md:text-left font-black text-2xl">¡Posiciona tu anuncio!</p>
                </div>                
                <p className="text-gray-600 w-full text-center md:text-left  mb-4 text-base">Dale un vistazo a nuestras opciones promocionales que darán una posición superior a tu anuncio.</p>
            </div>
            <div className="md:col-span-5 relative ">
                <div className='grid grid-cols-1 '>
                    <GenericAccordion objectToBeRendered={PROMOTIONS} onSelectedOption={onSelectedOption}/>                 
                </div>    
            </div>                                                                                         
        </>
  );
}

export default PromotedOptions;