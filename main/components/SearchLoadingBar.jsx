import React from 'react';
import '../styles/bouncingloader.css';
import { useSelector } from 'react-redux';

const SearchLoadingBar = () => {
  const {  text } = useSelector(state => state.searchProperties.properties);
  return (
    <div className="bouncing-loader bg-white p-2 w-full">
        <div></div>
        <div></div>
        <div></div>

      </div> )
}

export default SearchLoadingBar;