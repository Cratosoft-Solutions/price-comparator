"use client";
import React, {useState} from 'react'
import SearchButton from './SearchButton';
import ProductList from './ProductList';

const Search = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const setInternalData = (dataToSet) =>{
    dataToSet.forEach(element => {
      setData(oldArray => [...oldArray, element]);
    });
    console.log(data);
  }
  return (
    <>
      <section className="grid grid-cols-1 grid-rows-2 w-full">
        <h1 className="flex w-full justify-center font-bold p-4">
          <span className="orange_gradient text-center text-4xl lg:text-7xl ">Compara Elige Ahorra</span>
        </h1>
        <div className="flex w-full justify-center">
          <SearchButton 
            onSetData={setInternalData}
            onRestartData={setData}
            onSetLoading={setLoading}
          />
        </div>
      </section>
      <ProductList data={data} loading={loading} />
    </>
  );
}

export default Search;
