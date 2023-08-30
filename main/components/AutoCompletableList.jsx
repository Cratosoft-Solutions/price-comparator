"use client";
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { formatAutoCompletableItem, searchArrayCoincidences } from '@utils/functions';
import { setText, setCategory } from "@app/redux/slices/searchProperties";
import { useDispatch } from 'react-redux';

const AutoCompletableList = ({text}) => {
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

    return (
        <>
            {document.activeElement.id == 'txt-search' && text.length > 0 &&
                <ul className="bg-white w-full">   
                    {coincidencesList.slice(0, 5).map((coincidence, index)=>(
                        <li onClick={()=>{dispatch(setText(coincidence.key)); dispatch(setCategory(coincidence.category));  setCoincidencesList([]);}} key={index} className="pl-8 pr-2 py-1 border border-gray-50 relative cursor-pointer hover:bg-gray-100 hover:text-gray-900 text-gray-500">
                            <svg className="absolute w-4 h-4 left-2 top-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                            </svg>
                            {formatAutoCompletableItem(coincidence.category, coincidence.key)}
                        </li>
                    ))}
                </ul>
        }
        </>
  )
}

export default AutoCompletableList;