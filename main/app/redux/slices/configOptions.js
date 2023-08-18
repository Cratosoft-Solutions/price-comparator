import { createSlice } from "@reduxjs/toolkit";
import { SEARCH_DEFAULT_OPTIONS } from "@utils/constants";

const initialState = SEARCH_DEFAULT_OPTIONS;

const searchOptionsSlice = createSlice({
    name:"searchoptions",
    initialState,
    reducers:{
        setSearchOption: (state, action) => {
            switch (action.payload) {
                case "MINTOMAX":            
                  state.configuration = {...state.configuration, MINTOMAX:true, MAXTOMIN:false};     
                  break;
                case "MAXTOMIN":
                  state.configuration = {...state.configuration, MAXTOMIN:true, MINTOMAX:false};  
                  break;
                case "MATCH":
                  state.configuration = {...state.configuration, MATCH:!state.configuration.MATCH};   
                  break;
                case "NEWSEARCH":
                  state.configuration = SEARCH_DEFAULT_OPTIONS.configuration;
                  break;  
              }
        }
    }
});

export const { setSearchOption } = searchOptionsSlice.actions;
export default searchOptionsSlice.reducer;