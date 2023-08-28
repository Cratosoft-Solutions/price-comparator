import { createSlice } from "@reduxjs/toolkit";

const initialState = { searching: false };
const searchingSlice = createSlice({
    name:"productSearching",
    initialState,
    reducers:{
        setSearching:(state,action) =>{
            state.searching = action.payload;
        }
    }

});

export const {setSearching} = searchingSlice.actions;
export default searchingSlice.reducer;