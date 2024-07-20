import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  promotions: [],
  mostSearched: []
};

const advertisingSlide = createSlice({
    name:"advertising",
    initialState,
    reducers:{
        setAdvertising: (state, action) => {
            switch (action.payload.type) {
                case "promotions":
                    console.log("me llamaron reduzx");
                    state.promotions = action.payload.data;
                    break;
                case "dailySearches":
                    state.mostSearched = action.payload.data;
                    break;
                default:
                    break;
            }
        },        
    }
})

export const {setAdvertising} = advertisingSlide.actions;
export default advertisingSlide.reducer;