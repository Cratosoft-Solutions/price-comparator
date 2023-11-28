"use client";
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { formatAutoCompletableItem, searchArrayCoincidences } from '@utils/functions';
import { setText, setCategory } from "@app/redux/slices/searchProperties";
import { useDispatch } from 'react-redux';
import { MdOutlineProductionQuantityLimits } from "react-icons/md";


const AutoCompletableList = ({text, onChange}) => {
    const isWindow = () => typeof window !== 'undefined'; 

   const isBrowser = () => {
        if (!isWindow())
            return false;
        if(isWindow()){
            if(window.document.activeElement.id == 'txt-search')
             return true;
        }
        return false;
    }; 
   const [coincidencesList, setCoincidencesList]  = useState([]);
   const [tagsList, setTagsList]  = useState([]);
   const dispatch = useDispatch();


   useEffect(() => {
    const getTags = async() => {
        const response = await axios.get(`/api/search/coincidences`);
        const data = await response.data;
        setTagsList(data);
    }
    getTags();
   }, 
   []);

    useEffect(() => {
        setCoincidencesList([]);
        const getCoincidences = async() => {
            setCoincidencesList(searchArrayCoincidences(tagsList, text));
        }

        if(tagsList.length > 0)
            getCoincidences();
            
    }, [text]);

    const onSelectItem =(key, category)=>{
        dispatch(setText(key)); 
        dispatch(setCategory(category));  
        setCoincidencesList([]);
        onChange();
    }

    return (
        <>
            {isBrowser() && text.length > 0 &&
                <ul className="bg-white w-full lg:w-1/2 absolute">   
                    {coincidencesList.slice(0, 5).map((coincidence, index)=>(
                        <li onClick={()=>{onSelectItem(coincidence.key, coincidence.category)}} key={index} className="pl-8 pr-2 py-1 border border-gray-50 relative cursor-pointer hover:bg-gray-100 hover:text-gray-900 text-gray-500">
                           <div className='flex items-center gap-2'>
                           <MdOutlineProductionQuantityLimits className='h-4 w-4 inline' color='gray'/>
                            {formatAutoCompletableItem(coincidence.category, coincidence.key)}
                            </div>
                        </li>
                    ))}
                </ul>
        }
        </>
  )
}

export default AutoCompletableList;