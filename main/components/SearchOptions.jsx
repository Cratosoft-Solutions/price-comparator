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
    /*<div className="fixed top-16 lg:top-16 z-10 left-0 w-full bg-white">
      {showSearchOptions && (*/
    <>
      {showSearchOptions && (
        <div className="fixed top-12 lg:top-16 z-50 bg-white w-full lg:w-52 p-2 h-full min-h-screen border-r-[1px] border-gray-300">
          <div /*className=" overflow-x-auto grid grid-cols-1 grid-rows-1 lg:grid-cols-4 gap-2"*/
            /*className="bg-red-800 flex flex-row overflow-x-auto overflow-x-visible space-x-4 lg:space-x-12 no-scrollbar lg:no-scroll justify-left lg:justify-center overflow-scroll">*/
            className="grid grid-rows-6 gap-2"
          >
            <div className="grid grid-cols-[20%_80%] grid-rows-1 items-center  btn_nav  border-b-[1px] border-gray-300">
              <AiOutlineSearch className="w-6 h-6 " color="gray"/>
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
              <FaArrowUpShortWide className="w-6 h-6 " color="gray"/>
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
              <FaArrowDownShortWide className="w-6 h-6 " color="gray"/>
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
              <IoCheckmarkDone  pShortWide className="w-6 h-6 " color="gray"/>
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
              <IoCheckmark   className="w-6 h-6 " color="gray"/>
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
                color="gray"
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
            color="gray"
          />
        </div>
      )}
    </>

    /*)}
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
          {`${storeFullProducts.length} producto(s)/${storeFullData.length} tienda(s).`}
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
    </div>*/
  );
};

export default SearchOptions;
