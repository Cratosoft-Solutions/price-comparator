import { createSlice } from "@reduxjs/toolkit";

const initialState = { page: 1, size: 15 };
const paginationSlice = createSlice({
    name:"sitepagination",
    initialState,
    reducers:{
        setPage:(state, action) =>{
            state.page = action.payload;
        }
    }

});

export const {setPage} = paginationSlice.actions;
export default paginationSlice.reducer;