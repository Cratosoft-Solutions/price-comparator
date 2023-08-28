import React from 'react';
import '../styles/bouncingloader.css';
import { useSelector } from 'react-redux';

const SearchLoadingBar = () => {
  const {  text } = useSelector(state => state.searchProperties.properties);
  return (
    <div className="bouncing-loader bg-white p-2 w-full">
        <span className='text-orange-500 pl-4 flex items-center'><div className='ml-2 w-full'>{`Buscando ${text.substring(0, 15)} ${text.length > 15?"...":""}`}</div></span> 
        <div></div>
        <div></div>
        <div></div>

      </div> )
}

export default SearchLoadingBar;