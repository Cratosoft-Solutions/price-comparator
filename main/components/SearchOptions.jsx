import React from 'react';
import {AiOutlineSearch} from "react-icons/ai";

const SearchOptions = ({searchConfigOptions, onSetSearchConfig}) => {
  return (
    <div className='fixed top-16 z-10 left-0 w-full overflow-y-scroll bg-white p-4 border-b-2 border-orange-300'>    
      <div className='grid grid-cols-1 grid-rows-1 lg:grid-cols-4 gap-2'>
          <button onClick={()=>{onSetSearchConfig("NEWSEARCH")}} className={`orange_btn min-w-40`}> <AiOutlineSearch className='w-6 h-6'/> Nueva Búsqueda</button> 
          <button onClick={()=>{onSetSearchConfig("MINTOMAX")}} className={`${searchConfigOptions.MINTOMAX?'outline_btn_orange':'outline_btn'} min-w-40`}>Menor a Mayor Precio</button> 
          <button onClick={()=>{onSetSearchConfig("MAXTOMIN")}} className={`${searchConfigOptions.MAXTOMIN?'outline_btn_orange':'outline_btn'} min-w-40`}>Mayor a Menor Precio</button> 
          <button onClick={()=>{onSetSearchConfig("MATCH")}} className={`${searchConfigOptions.MATCH?'outline_btn_orange':'outline_btn'} min-w-40`}>Coincidencia Exacta</button> 
      </div>
    </div>

  )
}

export default SearchOptions