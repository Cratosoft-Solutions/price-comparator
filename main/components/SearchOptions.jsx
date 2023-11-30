"use client";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaArrowDownShortWide } from "react-icons/fa6";
import {FaArrowUpShortWide} from "react-icons/fa6"
import { IoCheckmark  } from "react-icons/io5"
import {IoCheckmarkDone } from "react-icons/io5"
import { RxHamburgerMenu } from "react-icons/rx";
import { BiCollapse } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setSearchOption } from "@app/redux/slices/configOptions";
import {
  restartProducts,
  setMatchedProducts,
  orderProducts,
} from "@app/redux/slices/products";
import SearchLoadingBar from "./SearchLoadingBar";
import { useRouter } from "next/navigation";

const SearchOptions = ({ setOptionSearch }) => {
  const { configuration } = useSelector((state) => state.searchoptions);
  const dispatch = useDispatch();
  const { text } = useSelector((state) => state.searchProperties.properties);
  const { searching } = useSelector((state) => state.productSearching);
  const [showSearchOptions, setShowSearchOptions] = useState(false);
  const router = useRouter();

  const { storeFullData, storeFullProducts } = useSelector(
    (state) => state.products
  );
  const textSearchArray = text.toUpperCase().split(" ");

  const expandCollapseOptionsBar = (expandOrCollapse) => {
    setOptionSearch(expandOrCollapse);
    setShowSearchOptions(expandOrCollapse);
  };

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
        router.push("/search/newsearch");
    }
  };

  return (
    <>
      {showSearchOptions && (
        <div className="fixed top-12 bg-white lg:top-20 lg:ml-2 z-50 bg-white w-full lg:w-52 p-2 h-fit lg:rounded-lg lg:p-2 shadow searchoptions">
          <div
            className="grid grid-rows-6 gap-2"
          >
            <div className="grid grid-cols-[20%_80%] grid-rows-1 items-center  btn_nav  border-b-[1px] border-orange-500 lg:bg-white">
              <AiOutlineSearch className="w-6 h-6 " color="orange"/>
              <button
                onClick={() => {
                  setSearchConfigProperty("NEWSEARCH");
                }}
                className="text-left pl-1"

              >
                Nueva Búsqueda
              </button>
            </div>
            <div
              className={`grid grid-cols-[20%_80%] grid-rows-1 items-center ${
                configuration.MINTOMAX ? "btn_nav_selected" : "btn_nav"
              } min-w-[10rem]`}
            >
              <FaArrowUpShortWide className="w-6 h-6 " color="green"/>
              <button
                onClick={() => {
                  setSearchConfigProperty("MINTOMAX");
                }}
                className="text-left pl-1"

              >
                Precio Menor
              </button>
            </div>
            <div
              className={`grid grid-cols-[20%_80%] grid-rows-1 items-center  ${
                configuration.MAXTOMIN ? "btn_nav_selected" : "btn_nav"
              } min-w-[10rem]`}
            >
              <FaArrowDownShortWide className="w-6 h-6 " color="green"/>
              <button
                onClick={() => {
                  setSearchConfigProperty("MAXTOMIN");
                }}
                className="text-left pl-1"
              >
                Precio Mayor
              </button>
            </div>
            <div
              className={`grid grid-cols-[20%_80%] grid-rows-1 items-center justify-center ${
                configuration.MATCH ? "btn_nav_selected" : "btn_nav"
              } min-w-[10rem]`}
            >
              <IoCheckmarkDone  pShortWide className="w-6 h-6 " color="green"/>
              <button
                onClick={() => {
                  setSearchConfigProperty("MATCH");
                }}
                className="text-left pl-1"

              >
                Exacto
              </button>
            </div>
            <div
              className={`grid grid-cols-[20%_80%] grid-rows-1 items-center justify-center ${
                !configuration.MATCH ? "btn_nav_selected" : "btn_nav"
              } min-w-[10rem]`}
            >
              <IoCheckmark   className="w-6 h-6 " color="green"/>
              <button
                onClick={() => {
                  setSearchConfigProperty("MATCH");
                }}
                className="text-left pl-1"

              >
                Todos
              </button>
            </div>
            <div className=" flex z-50 w-full justify-center items-center">
              <BiCollapse
                onClick={() => {
                  expandCollapseOptionsBar(false);
                }}
                className="h-6 w-6"
                color="green"
              />
            </div>
          </div>
        </div>
      )}
      {!showSearchOptions && (
        <div className="fixed top-12 lg:top-16 z-50 bg-white w-full lg:w-10 p-2 h-fit lg:min-h-screen border-r-[1px] border-gray-300">
          <RxHamburgerMenu
            onClick={() => {
              expandCollapseOptionsBar(true);
            }}
            className="h-6 w-6"
            color="green"
          />
        </div>
      )}
    </>

   
  );
};

export default SearchOptions;
