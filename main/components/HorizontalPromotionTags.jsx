"use client"
import React, { useEffect, useRef, useState } from 'react'
import GenericAnimation from './GenericAnimation'

const HorizontalPromotionTags = ({product}) => {
    const parentHTML = useRef(null);
    const [autoInterval, setAutoInterval] = useState(null);
    const [tagsListToRender, setTagsListToRender] = useState([]);

    useEffect(()=>{
        const tempTags = [];
        if(product.negotiable == "YES")
            tempTags.push("Negociable, aproveche.");
        
        if(product.formatedEspecialPrice != 0)
            tempTags.push("¡Rebajado!");    

        setTagsListToRender(tempTags);

    }, []);

      const executeAutomaticScroll = () => {
        try {
          if (
            Math.abs(
              Math.ceil(parentHTML?.current?.scrollLeft) -
                Math.ceil(
                  parentHTML?.current?.scrollWidth - parentHTML?.current?.clientWidth
                )
            ) >= 1
          ) {
            parentHTML.current.scrollLeft += 1;
          } else {
            parentHTML.current.scrollLeft = 0;
          }
        } catch (error) {
          clearInterval(autoInterval);
        }
       
      };

      useEffect(()=>{
        const tempAutoInterval = setInterval(() => {   
          executeAutomaticScroll();
        }, 30);
        setAutoInterval(tempAutoInterval);
    }, [])
  return (
    <div ref={parentHTML} className='flex no-scrollbar overflow-x-auto h-6 bg-transparent absolute bottom-0  left-0 w-full '>
        {tagsListToRender.map((element, index)=>(
             <GenericAnimation animation={""} message={element} key={index}/>
        ))}
    </div>
  )
}

export default HorizontalPromotionTags