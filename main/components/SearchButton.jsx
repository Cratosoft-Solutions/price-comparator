"use client";

import DropDownList from "./DropDownList";
import { BTN_SEARCH_DEFAULT_BEHAVIOUR, CATEGORIES } from "@utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { restartProducts } from "@app/redux/slices/products";
import { setText } from "@app/redux/slices/searchProperties";
import AutoCompletableList from "./AutoCompletableList";
import { useRouter } from "next/navigation";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import UserSearches from "./UserSearches";
import { translateCategory } from "@utils/functions";


const SearchButton = ({personalizedClass="",behaviour=BTN_SEARCH_DEFAULT_BEHAVIOUR}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const showCategory = false;
  const { text } = useSelector(state => state.searchProperties.properties);
  const { category} = useSelector(state => state.siteNav);
  const [userIsConnected, setUserIsConnected] = useState(false);
  const [showMySearchs, setShowMySearchs] = useState(false);
  
  /*const setInternalCategory = (category) => {
    dispatch(setCategory(category));
  };*/

  const restartFields = (value) => {
    dispatch(setText(value.replace(/[^a-zA-Z0-9 ]/g, "")));
    dispatch(restartProducts());
  }

  const executeSearch = (e) => {
    if (e) e.preventDefault();

    router.push(`/search/results?search=${text}`);
  }


  useEffect(()=>{
    const getUserSearch = async ()=>{
      const session = await getSession();
      const user =  session?.user;
      if (typeof user != 'undefined'){
        setUserIsConnected(true);
      }
    }
      getUserSearch();
  }, 
  []);

  return (
    <div
      className={`w-full justify-center flex ${personalizedClass} ${
        behaviour.displayImage ? "!bg-cover bg-no-repeat text-center h-80 " : ""
      }`}
      style={behaviour.style}
    >
      <div
        className="h-full w-full flex justify-start items-center   "
        style={behaviour.displayImage?{ backgroundColor: "bg-blue-100" }: {}}
      >
        <div className={`${behaviour.size} grid place-items-center`}>
          <form
            onSubmit={executeSearch}
            className="grid grid-cols-1 grid-rows-1 lg:grid-rows-1 lg:grid-cols-1 gap-0 w-full "
          >
            {showCategory && (
              <DropDownList
                values={CATEGORIES}
                onSelectValue={setInternalCategory}
                currentValue={1}
              />
            )}
            <div className="relative text-gray-500">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <button
                  disabled={text.length < 3}
                  type="submit"
                  className="p-1 focus:outline-none focus:shadow-outline"
                >
                  <svg
                    fill="none"
                    stroke={behaviour.iconSearchColor}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    className="w-6 h-6"
                  >
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </button>
              </span>
              <input
                onChange={(e) => {
                  restartFields(e.target.value);
                }}
                value={text}
                id="txt-search"
                type="search"
                name="q"
                className={` pr-4 ${behaviour.placeHolderText} ${behaviour.placeHolderColor } ${behaviour.fSize} ${behaviour.textColor} ${behaviour.bgColor} ${behaviour.borderType?behaviour.borderType:'md:rounded-full'} ${behaviour.borderColor}   ${behaviour.bSize}  pl-10 focus:outline-none  ${behaviour.height} w-full`}
                placeholder={`¿Qué buscas?`}
                autoComplete="off"
              />
            </div>
          </form>
          <div className="grid grid-cols-1 grid-rows-1 w-full">
            <AutoCompletableList text={text} onChange={executeSearch} />
          </div>
          {userIsConnected && 1 == 2 /*ELIMINAR*/ && (
            <button
              onClick={() => {
                setShowMySearchs(true);
              }}
              className="flex w-full justify-left mb-2 lg:mb-6 text-medium text-gray-600 items-center"
            >
              <HiOutlineDocumentSearch />
              Ver mis búsquedas anteriores
            </button>
          )}
          {showMySearchs && <UserSearches onHideSearch={setShowMySearchs} />}
        </div>
      </div>
    </div>
  );
}

export default SearchButton;