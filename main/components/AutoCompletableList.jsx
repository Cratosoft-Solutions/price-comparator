"use client";
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { formatAutoCompletableItem, searchArrayCoincidences, translateCategory } from '@utils/functions';
import { setText } from "@app/redux/slices/searchProperties";
import { setCategory } from "@app/redux/slices/siteNav";
import { useDispatch } from 'react-redux';
import { IoSearchOutline } from "react-icons/io5";



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
   const [uniqueCategories, setUniqueCategories] = useState([]);
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
            setUniqueCategories(searchArrayCoincidences(tagsList, text).map(item => item.category).filter((value, index, self) => self.indexOf(value) === index))
        }

        if(tagsList.length > 0)
            getCoincidences();
            
    }, [text]);

    const onSelectItem =(category, key)=>{
        dispatch(setText(key)); 
        dispatch(setCategory(category));  
        setCoincidencesList([]);
        onChange(category,  key);
    }

    return (
      <>
        {isBrowser() && text.length > 0 && (
          <ul className="bg-white w-full absolute p-2">
            {uniqueCategories.map((element, index) => (
              <>
                <li key={"mainul"+index} className=" flex items-center text-base text-black font-black p-4">
                  <p className='capitalize'>{translateCategory(element, "SEARCHTEXT")}</p>
                </li>
                {coincidencesList.filter(coincidence => coincidence.category == element ).slice(0, 5).map((coincidence, index) => (
                  <li onClick={() => {onSelectItem(coincidence.category, coincidence.key);}} key={index}
                    className="pl-8 pr-2 py-1 relative cursor-pointer hover:bg-gray-100 hover:text-gray-900 text-gray-500">
                    <div className="flex items-center text-base hover:text-extrabold gap-2 items-center ">
                        <IoSearchOutline className='w-4 h-4' color='gray'/>
                      <p className='capitalize'>{formatAutoCompletableItem("", coincidence.key)}</p>
                    </div>
                  </li>
                ))}
              </>
            ))}
          </ul>
        )}
      </>
    );
}

export default AutoCompletableList;