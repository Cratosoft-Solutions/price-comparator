import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setSearchOption } from "@app/redux/slices/configOptions";
import {
  restartProducts,
  setMatchedProducts,
  orderProducts,
} from "@app/redux/slices/products";
import SearchLoadingBar from "./SearchLoadingBar";

const SearchOptions = () => {
  const { configuration } = useSelector((state) => state.searchoptions);
  const dispatch = useDispatch();
  const {  text } = useSelector(state => state.searchProperties.properties);
  const { loading } = useSelector(state =>state.siteloading);
  const { searching } = useSelector(state =>state.productSearching);

  const { storeFullData } = useSelector((state) => state.products);
  const textSearchArray = text.toUpperCase().split(" ");

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
        dispatch(restartProducts());
        break;
    }
  };

  return (
   <div className="fixed top-16 z-10 left-0 w-full bg-white">
    <div className="overflow-y-scroll bg-white p-4">
      <div className="grid grid-cols-1 grid-rows-1 lg:grid-cols-4 gap-2">
        <button
          onClick={() => {setSearchConfigProperty("NEWSEARCH");}}
          className="orange_btn min-w-40"
        >
          <AiOutlineSearch className="w-6 h-6" /> Nueva Búsqueda
        </button>
        <button
          onClick={() => {setSearchConfigProperty("MINTOMAX");}}
          className={`${
            configuration.MINTOMAX ? "outline_btn_orange" : "outline_btn"
          } min-w-40`}
        >
          Menor a Mayor Precio
        </button>
        <button
          onClick={() => {setSearchConfigProperty("MAXTOMIN");}}
          className={`${
            configuration.MAXTOMIN ? "outline_btn_orange" : "outline_btn"
          } min-w-40`}
        >
          Mayor a Menor Precio
        </button>
        <button
          onClick={() => {setSearchConfigProperty("MATCH");}}
          className={`${
            configuration.MATCH ? "outline_btn_orange" : "outline_btn"
          } min-w-40`}
        >
          Coincidencia Exacta
        </button>
          
      </div>

    </div>
    <div className="h-16 lg:h-10 w-full grid grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1  border-b-2 border-orange-300">
          {searching? <div className="flex justify-center w-full bg-red-800"><SearchLoadingBar /></div> : <div className="flex items-center justify-center w-full font-medium  text-green-700 font-bold">Busqueda Finalizada</div> }
          <div className="bg-primary p-4 pl-2 flex items-center justify-center bg-white">Resultados en {storeFullData.length} tienda(s)</div>
        </div>
    </div>
  );
};

export default SearchOptions;
