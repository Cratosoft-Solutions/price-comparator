import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setSearchOption } from "@app/redux/slices/configOptions";
import {
  restartProducts,
  setMatchedProducts,
  orderProducts,
} from "@app/redux/slices/products";

const SearchOptions = ({ textSearchArray }) => {
  const { configuration } = useSelector((state) => state.searchoptions);
  const dispatch = useDispatch();

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
    <div className="fixed top-16 z-10 left-0 w-full overflow-y-scroll bg-white p-4 border-b-2 border-orange-300">
      <div className="grid grid-cols-1 grid-rows-1 lg:grid-cols-4 gap-2">
        <button
          onClick={() => {setSearchConfigProperty("NEWSEARCH");}}
          className={`orange_btn min-w-40`}
        >
          {" "}
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
  );
};

export default SearchOptions;
