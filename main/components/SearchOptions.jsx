import React from 'react'

const SearchOptions = ({searchConfigOptions, onSetSearchConfig}) => {
  return (
    <div className='flex flex-row overflow-x-scroll space-x-6 bg-white p-4 mx-14  h-30 justify-center items-center'>
      <button onClick={()=>{onSetSearchConfig("GROUPBYSTORE")}} className={`${searchConfigOptions.GROUPBYSTORE?'outline_btn_orange':'outline_btn'} min-w-40`}>Agrupar por tiendas</button> 
      <button onClick={()=>{onSetSearchConfig("NOTGROUPBYSTORE")}} className={`${!searchConfigOptions.GROUPBYSTORE?'outline_btn_orange':'outline_btn'} min-w-40`}>Mostrar Todo Junto</button> 
      <button onClick={()=>{onSetSearchConfig("MAXTOMIN")}} className='outline_btn min-w-40'>Mayor a Menor Precio</button> 
      <button onClick={()=>{onSetSearchConfig("MATCH")}} className='outline_btn min-w-40'>Coincidencia Exacta</button> 
    </div>
  )
}

export default SearchOptions