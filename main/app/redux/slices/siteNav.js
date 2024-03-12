import { createSlice } from "@reduxjs/toolkit";

const initialState = { category: "PRODUCT", expandedBar:false };
const sisteNavSlice = createSlice({
    name:"siteNav",
    initialState,
    reducers:{
        setCategory:(state,action) =>{
            state.category = action.payload;
        },
        setExpandedBar:(state,action) =>{
            state.expandedBar = action.payload;
        }
    }

});

export const {setCategory, setExpandedBar} = sisteNavSlice.actions;
export default sisteNavSlice.reducer;