import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../slices/products";
import configOptions from "../slices/configOptions";
import loading from "../slices/loading";
import searchProperties from "../slices/searchProperties";
import searching from "../slices/searching";
import pagination from "../slices/pagination";
import termsConditions from "../slices/termsConditions";
import verticalNav from "../slices/verticalNav";
import siteNav from "../slices/siteNav";

const store = configureStore({
    reducer:{
        products: productsReducer,
        searchoptions: configOptions,
        siteloading: loading, 
        searchProperties: searchProperties,
        productSearching:searching,
        sitepagination:pagination,
        termsConditions:termsConditions,
        verticalnav: verticalNav,
        siteNav: siteNav,
    },
});

export default store;