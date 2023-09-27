
"use client";
import React, {useState} from "react";
import { AiOutlineSearch } from "react-icons/ai";
import {RiArrowUpSLine} from "react-icons/ri";
import {AiFillEdit} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setSearchOption } from "@app/redux/slices/configOptions";
import {
  restartProducts,
  setMatchedProducts,
  orderProducts,
} from "@app/redux/slices/products";
import SearchLoadingBar from "./SearchLoadingBar";
import { useRouter } from "next/navigation";


const SearchOptions = ({setOptionSearch}) => {
  const { configuration } = useSelector((state) => state.searchoptions);
  const dispatch = useDispatch();
  const {  text } = useSelector(state => state.searchProperties.properties);
  const { searching } = useSelector(state =>state.productSearching);
  const [showSearchOptions, setShowSearchOptions] = useState(false);
  const router = useRouter();

  const { storeFullData, storeFullProducts } = useSelector((state) => state.products);
  const textSearchArray = text.toUpperCase().split(" ");


  const expandCollapseOptionsBar = (expandOrCollapse) =>{
    setOptionSearch(expandOrCollapse);
    setShowSearchOptions(expandOrCollapse);
  }

  const setSearchConfigProperty = (property) => {
    dispatch(setSearchOption(property));
    switch (property) {
      case "MINTOMAX":
        dispatch(orderProducts(1));
        break;
      case "MAXTOMIN":
        dispatch(orderProducts(-1));
        break;
      case "MATCH":
        dispatch(setMatchedProducts(textSearchArray));
        break;
      case "NEWSEARCH":
        expandCollapseOptionsBar(false);
        dispatch(restartProducts());
        router.push('/search/newsearch');
    }
  };

  return (
    <div className="fixed top-16 lg:top-16 z-10 left-0 w-full bg-white">
      {showSearchOptions && (
        <div className=" bg-white p-4">
          <div /*className=" overflow-x-auto grid grid-cols-1 grid-rows-1 lg:grid-cols-4 gap-2"*/
          className="flex flex-row overflow-x-auto overflow-x-visible space-x-4 lg:space-x-12 no-scrollbar lg:no-scroll justify-left lg:justify-center overflow-scroll">
            <button
              onClick={() => {
                setSearchConfigProperty("NEWSEARCH");
              }}
              className="orange_btn  min-w-[10rem]"
            >
              <AiOutlineSearch className="w-6 h-6" /> Nueva Búsqueda
            </button>
            <button
              onClick={() => {
                setSearchConfigProperty("MINTOMAX");
              }}
              className={`${
                configuration.MINTOMAX ? "outline_btn_orange" : "outline_btn"
              } min-w-[10rem]`}
            >
              Menor a Mayor Precio
            </button>
            <button
              onClick={() => {
                setSearchConfigProperty("MAXTOMIN");
              }}
              className={`${
                configuration.MAXTOMIN ? "outline_btn_orange" : "outline_btn"
              }  min-w-[10rem]`}
            >
              Mayor a Menor Precio
            </button>
            <button
              onClick={() => {
                setSearchConfigProperty("MATCH");
              }}
              className={`${
                configuration.MATCH ? "outline_btn_orange" : "outline_btn"
              }  min-w-[10rem]`}
            >
              Coincidencia Exacta
            </button>
          </div>
        </div>
      )}
      <div className="h-24 lg:h-10 w-full grid grid-cols-1 grid-rows-3 lg:grid-cols-3 lg:grid-rows-1  border-b-2 border-orange-300">
        {searching ? (
          <div className="flex justify-center w-full bg-red-800">
            <SearchLoadingBar />
          </div>
        ) : (
          <div className="flex items-center justify-center w-full font-medium  text-green-700 font-bold">
            Busqueda Finalizada
          </div>
        )}
        <div className="bg-primary p-4 pl-2 flex items-center justify-center bg-white">
          {`${storeFullProducts.length} coincidencia(s)/${storeFullData.length} tienda(s).`}
        </div>
        <div className="bg-primary flex items-center justify-center bg-white p-2">
         {showSearchOptions && <RiArrowUpSLine
            onClick={() => {
              expandCollapseOptionsBar(false);
            }}
            className="h-6 w-6"
            color="red"
          />}

          {!showSearchOptions && <AiFillEdit
            onClick={() => {
              expandCollapseOptionsBar(true);
            }}
            className="h-6 w-6"
            color="black"
          />}
        </div>
      </div>
    </div>
  );
};

export default SearchOptions;
