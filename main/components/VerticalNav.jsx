"use client"
import React, { useState } from 'react';
import { IoCloseOutline } from "react-icons/io5";
import UserSession from './UserSession';
import SiteCategories from './SiteCategories';
import SiteMission from './SiteMission';

const VerticalNav = ({showNav, expandCollapseOptionsBar, principalOption, secondaryOptions, onSelectedButton}) => {
  const [selectedOption,setSelectedOption] = useState(2);

  const setInternalSelectedOption = (option)=>{
    if(option === selectedOption){
      setSelectedOption(0);
    }else{
      setSelectedOption(option);
    }
  }

  return (
    <>
        {showNav && (
          <div className='w-full absolute top-0 z-50 max-heigh-available bg-black bg-opacity-70'>
            <div className=" bg-dark-surface z-50 w-full lg:w-80 h-full shadow-xl searchoptions relative border-r border-dark-border">
            <IoCloseOutline onClick={() => { expandCollapseOptionsBar(false); }} className="h-10 w-10 fixed ml-80 mt-2 lg:ml-80 lg:mt-0 stroke-dark-text lg:!stroke-dark-muted hover:stroke-accent-glow transition-colors"/>
                <div className="grid grid-cols-1 grid-rows-1 items-center bg-dark-elevated">
                      <UserSession />
                </div>
                <div id="accordion-collapse" data-accordion="collapse">
                  <h2 id="accordion-collapse-heading-1">
                    <button onClick={()=>{setInternalSelectedOption(1)}} type="button" className="flex items-center justify-between w-full p-5 font-medium text-dark-text hover:bg-dark-card transition-colors" data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
                      <span className='font-black text-dark-text'>Categorias</span>
                      <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
                      </svg>
                    </button>
                  </h2>
                  <div id="accordion-collapse-body-1" className={`${selectedOption ==1?"block":"hidden"}`} aria-labelledby="accordion-collapse-heading-1">
                      <div className={`grid grid-cols-1 grid-rows-4 h-fit  min-w-[10rem] ml-5 gap-6`}>
                        <SiteCategories/>
                      </div>              </div>
                  <h2 id="accordion-collapse-heading-2">
                    <button onClick={()=>{setInternalSelectedOption(2)}} type="button" className="flex items-center justify-between w-full p-5 font-medium text-dark-text hover:bg-dark-card transition-colors" data-accordion-target="#accordion-collapse-body-2" aria-expanded="false" aria-controls="accordion-collapse-body-2">
                      <span className='font-black text-dark-text'>Más opciones para vos</span>
                      <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
                      </svg>
                    </button>
                  </h2>
                  <div id="accordion-collapse-body-2" className={`${selectedOption ==2?"block":"hidden"}`} aria-labelledby="accordion-collapse-heading-2">
                      <div className={`ml-5 grid grid-rows-${secondaryOptions.length} gap-2`}>
                        <div className="grid grid-cols-1 grid-rows-1 items-center h-10 hover:text-accent-glow transition-colors">
                          <button
                            onClick={() => {
                              onSelectedButton(
                                principalOption.btnNAVPage,  
                                principalOption.btnID
                              );
                              expandCollapseOptionsBar(false);
                            }}
                            className="text-dark-text text-left"
                          >
                            {principalOption.btnDescription}
                          </button> 
                        </div>
            
                        {secondaryOptions.map((filteredOption, index) => (
                          <div key={index}
                            className={`grid grid-cols-1 grid-rows-1 items-center min-w-[10rem] h-10 hover:text-accent-glow transition-colors`}
                          >

                            <button
                              onClick={() => {
                                  onSelectedButton(
                                  filteredOption.btnNAVPage,  
                                  filteredOption.btnID
                                );
                                expandCollapseOptionsBar(false);
                              }}
                              className="text-dark-text text-left"
                            >
                              {filteredOption.btnDescription}
                            </button>
                          </div>
                        ))}
                      </div>
                  </div>
                  <h2 id="accordion-collapse-heading-3">
                    <button onClick={()=>{setInternalSelectedOption(3)}} type="button" className="flex items-center justify-between w-full p-5 font-medium text-dark-text hover:bg-dark-card transition-colors" data-accordion-target="#accordion-collapse-body-3" aria-expanded="false" aria-controls="accordion-collapse-body-3">
                      <span className='text-dark-text font-black'>Acerca de nosotros</span>
                      <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
                      </svg>
                    </button>
                  </h2>
                  <div id="accordion-collapse-body-3" className={`${selectedOption ==3?"block":"hidden"}`} aria-labelledby="accordion-collapse-heading-3">
                    <div className="text-dark-text p-5 border border-t-0 border-dark-border">
                      <SiteMission />                  
                    </div>
                  </div>
                </div>
            </div>

          </div>  
        )}        
      </>
  )
}

export default VerticalNav
