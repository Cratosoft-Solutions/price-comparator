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
          <ul className="bg-dark-elevated/95 backdrop-blur-xl w-full absolute mt-2 p-2 border border-dark-border/50 rounded-xl shadow-2xl shadow-black/40 z-50">
            {uniqueCategories.map((element, index) => (
              <React.Fragment key={"mainul"+index}>
                <li className="flex items-center text-xs font-semibold text-dark-muted uppercase tracking-wider px-3 pt-3 pb-1.5">
                  <p className='capitalize'>{translateCategory(element, "SEARCHTEXT")}</p>
                </li>
                {coincidencesList.filter(coincidence => coincidence.category == element ).slice(0, 5).map((coincidence, cIndex) => (
                  <li onClick={() => {onSelectItem(coincidence.category, coincidence.key);}} key={`${index}-${cIndex}`}
                    className="px-3 py-2 relative cursor-pointer hover:bg-dark-card/80 text-dark-muted rounded-lg transition-all duration-150 group">
                    <div className="flex items-center text-sm gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-dark-surface flex items-center justify-center flex-shrink-0 group-hover:bg-accent-primary/15 transition-colors">
                          <IoSearchOutline className='w-3.5 h-3.5 text-dark-muted group-hover:text-accent-glow transition-colors'/>
                        </div>
                      <p className='capitalize group-hover:text-dark-text transition-colors'>{formatAutoCompletableItem("", coincidence.key)}</p>
                    </div>
                  </li>
                ))}
              </React.Fragment>
            ))}
          </ul>
        )}
      </>
    );
}

export default AutoCompletableList;
