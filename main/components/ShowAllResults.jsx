import { setSearchOption } from '@app/redux/slices/configOptions';
import React from 'react';
import { useDispatch } from 'react-redux';

const ShowAllResults = () => {
    const dispatch = useDispatch();
  return (
    <div className="flex w-full justify-center items-center mt-10 text-center">
        <div className='grid grid-cols-1 grid-rows-2 gap-2'>
        <div>No se encontraron productos con coincidencia exacta. </div>
        <div className='flex w-full items-center justify-center'>
            <button className = "black_btn w-1/2 lg:w-sm" onClick={()=>{dispatch(setSearchOption("MATCH"));}}>Ver todos los resultados</button>
        </div>
        </div>
    </div>
  )
}

export default ShowAllResults