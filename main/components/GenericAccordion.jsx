import React, { useState } from "react";
import GenericAccordionPromotionBody from "./GenericAccordionPromotionBody";
import { IoIosArrowDown } from "react-icons/io";

const GenericAccordion = ({ objectToBeRendered, onSelectedOption }) => {

  const [selectedOption, setSelectedOption] = useState(-1);
  const [selectedPromotion, setSelectedPromotion] = useState(1); 
 
  const setInternalSelectedOption = (newSelectedOption) => {
        setSelectedOption(newSelectedOption != selectedOption? newSelectedOption:-1);
       
  };

  const setInternalSelectedPromotion = (newSelectedOption) => {
    setSelectedPromotion(newSelectedOption != selectedPromotion? newSelectedOption:0);
    onSelectedOption(newSelectedOption != selectedPromotion? newSelectedOption:0);
  };
  

  const renderBody=(body, index)=>{
    return <GenericAccordionPromotionBody bodyToBeRendered={body} selectedOption={selectedOption} onOptionSelected={setInternalSelectedOption} index={index}/>
  }

  return (
    <div className="h-fit w-full top-0 max-heigh-available bg-black bg-opacity-50">
      <div className=" bg-white bg-white w-full h-full shadow searchoptions relative">
        <div id="accordion-collapse" data-accordion="collapse">
          {objectToBeRendered.filter(filteredElement => filteredElement.enabled).map((element, index) => (
            <>
              <h2 id={`accordion-collapse-heading-${index}`} className={element.value==selectedPromotion?'p-5 bg-green-100':'p-5 bg-white'}>
                <div
                  className="flex items-center justify-between w-full mb-1 font-medium hover:cursor-pointer"
                  data-accordion-target={`#accordion-collapse-body-${index}`}
                  aria-expanded="true"
                  aria-controls={`accordion-collapse-body-${index}`}
                  onClick={()=>{setInternalSelectedOption(index)}}
                >
                  <span className="font-black text-black ">{element.label}</span>
                  <IoIosArrowDown className="w-3 h-3"/>
                </div>
                <div key={`checkbox-input-${index}`} className="flex items-center">
                    <input disabled id={`promotionscheck-${index}`} key={`promotionscheck-${index}`} type="checkbox"  className="w-4 h-4 accent-gray-900 dark:accent-white" checked={element.value==selectedPromotion} onChange={()=>{setInternalSelectedPromotion(element.value)}}/>
                    <label htmlFor={`promotionscheck    -${index}}`} className="pl-2 text-gray-600    text-sm   flex items-center">Seleccionar</label>
                </div>
              </h2>
              <div
                id={`accordion-collapse-body-${index}`}
                className={`${selectedOption == index ? "block" : "hidden"}`}
                aria-labelledby="accordion-collapse-heading-1"
              >
                <div
                  className={`grid grid-cols-1 grid-rows-1 h-fit p-4`}
                >                  
                  {renderBody(element, index)}
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenericAccordion;
