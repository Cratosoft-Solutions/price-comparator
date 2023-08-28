import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../slices/products";
import configOptions from "../slices/configOptions";
import loading from "../slices/loading";
import searchProperties from "../slices/searchProperties";
import searching from "../slices/searching";

const store = configureStore({
    reducer:{
        products: productsReducer,
        searchoptions: configOptions,
        siteloading: loading, 
        searchProperties: searchProperties,
        productSearching:searching
    },
});

export default store;