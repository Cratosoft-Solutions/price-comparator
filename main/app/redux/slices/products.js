import { createSlice } from "@reduxjs/toolkit";
import { filterArrayBySearchText, comparePrice } from "@utils/functions";

const initialState = {
  storeFullData: [],
  storeFullProducts: [],
  storeFullMatchedProducts: [],
};

const productsSlice = createSlice({
    name:"products",
    initialState,
    reducers:{
        pushProduct: (state, action) => {
            state.storeFullData.push(action.payload);
            action.payload.companyProducts.forEach(element => {
                state.storeFullProducts.push(element);
            });
        },
        restartProducts: (state) => {
            state.storeFullData = initialState.storeFullData;
            state.storeFullProducts = initialState.storeFullProducts;
            state.storeFullMatchedProducts = initialState.storeFullMatchedProducts;
        },
        setMatchedProducts:(state, action) =>{
          state.storeFullMatchedProducts = filterArrayBySearchText(state.storeFullProducts, action.payload);     
        },
        orderProducts:(state, action) =>{
            state.storeFullProducts = state.storeFullProducts.sort(comparePrice("formatedPrice", action.payload)); 
            state.storeFullMatchedProducts = state.storeFullMatchedProducts.sort(comparePrice("formatedPrice", action.payload));   
        }
    }
})

export const {pushProduct, restartProducts, setMatchedProducts, orderProducts} = productsSlice.actions;
export default productsSlice.reducer;