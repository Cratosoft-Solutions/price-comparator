"use client";

import { CATEGORY_TYPES } from "@utils/constants";
import { useDispatch, useSelector } from "react-redux";
import AutoCompletableList from "./AutoCompletableList";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { setCategory } from "@app/redux/slices/siteNav";
import { setText } from "@app/redux/slices/searchProperties";
import { IoSearchOutline } from "react-icons/io5";
import SearchDropDown from "./SearchDropDown";

const SearchButton = ({ personalizedClass = "", rounded = true }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { category } = useSelector((state) => state.siteNav);
  const { text } = useSelector((state) => state.searchProperties.properties);
  const [showCoincidences, setShowCoincidences] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const setInternalCategory = (category) => {
    dispatch(setCategory(category));
  };

  const restartFields = (value) => {
    setShowCoincidences(true);
    dispatch(setText(value.replace(/[^a-zA-Z0-9 ]/g, "")));
  };

  const executeSearch = (e) => {
    if (e) e.preventDefault();
    setShowCoincidences(false);
    redirectPage(category, text);
  };

  const redirectPage = (category, text) => {
    router.push(`/search/results?category=${category}&search=${text}`);
  };

  return (
    <div className={`relative w-full ${personalizedClass}`}>
      <form
        onSubmit={executeSearch}
        className={`flex items-center w-full h-full rounded-full border transition-all duration-300 overflow-visible ${
          isFocused
            ? "border-accent-primary/60 shadow-lg shadow-accent-primary/10 ring-1 ring-accent-primary/20"
            : "border-dark-border/50 shadow-lg shadow-black/10 hover:border-dark-border"
        } bg-dark-surface/80 backdrop-blur-sm`}
      >
        {/* Custom Category Dropdown */}
        <SearchDropDown
          values={CATEGORY_TYPES}
          onSelectValue={setInternalCategory}
          currentValue={category}
        />

        {/* Divider */}
        <div className="w-px h-6 bg-dark-border/40 flex-shrink-0" />

        {/* Search Input */}
        <div className="relative flex-1 flex items-center h-full min-w-0">
          <IoSearchOutline className="w-4 h-4 text-dark-muted absolute left-3 flex-shrink-0 pointer-events-none" />
          <input
            onChange={(e) => restartFields(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={text}
            id="txt-search"
            type="search"
            name="q"
            className="bg-transparent text-dark-text pl-9 pr-2 focus:outline-none h-full w-full text-sm placeholder-dark-muted"
            placeholder="¿Qué buscas hoy?"
            autoComplete="off"
          />
        </div>

        {/* Search CTA Button */}
        <button
          type="submit"
          className="flex items-center gap-1.5 h-[calc(100%-8px)] px-4 lg:px-5 mr-1 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary text-white text-sm font-semibold hover:from-accent-secondary hover:to-accent-primary transition-all duration-300 shadow-md shadow-accent-primary/20 hover:shadow-lg hover:shadow-accent-primary/30 flex-shrink-0"
        >
          <IoSearchOutline className="w-4 h-4" />
          <span className="hidden sm:inline">Buscar</span>
        </button>
      </form>

      {/* Autocomplete Results */}
      {showCoincidences && (
        <div className="grid grid-cols-1 grid-rows-1 w-full z-50">
          <AutoCompletableList text={text} onChange={redirectPage} />
        </div>
      )}
    </div>
  );
};

export default SearchButton;
