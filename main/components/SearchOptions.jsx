import React from 'react'

const SearchOptions = ({searchConfigOptions, onSetSearchConfig}) => {
  return (
    <div className='grid grid-cols-1 p-4 grid-rows-1 lg:grid-cols-3 gap-2'>
      <button onClick={()=>{onSetSearchConfig("MINTOMAX")}} className={`${searchConfigOptions.MINTOMAX?'outline_btn_orange':'outline_btn'} min-w-40`}>Menor a Mayor Precio</button> 
      <button onClick={()=>{onSetSearchConfig("MAXTOMIN")}} className={`${searchConfigOptions.MAXTOMIN?'outline_btn_orange':'outline_btn'} min-w-40`}>Mayor a Menor Precio</button> 
      <button onClick={()=>{onSetSearchConfig("MATCH")}} className={`${searchConfigOptions.MATCH?'outline_btn_orange':'outline_btn'} min-w-40`}>Coincidencia Exacta</button> 
    </div>
  )
}

export default SearchOptions