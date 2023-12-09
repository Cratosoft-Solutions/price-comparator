import { createSlice } from "@reduxjs/toolkit";
import { VERTICAL_NAV_STATUS } from "@utils/constants";

const initialState = VERTICAL_NAV_STATUS;

const verticalNavOptionsSlide = createSlice({
    name:"verticalnav",
    initialState,
    reducers:{
        setMyStoreConfig: (state, action) => {
            switch (action.payload) {
                case "CONFIG":            
                  state.myStoreNav = {...state.myStoreNav, selectedOption:"configuration"};     
                  break;
                case "ADDPRODUCT":
                  state.myStoreNav = {...state.myStoreNav, selectedOption:"products"};  
                  break;
                case "LISTITEM":
                state.myStoreNav = {...state.myStoreNav, selectedOption:"myproducts"};  
                break;
                case "EXPANDNAV":
                    state.myStoreNav = {...state.myStoreNav, expandedNavBar:true};  
                    break;  
                case "COLLAPSENAV":
                    state.myStoreNav = {...state.myStoreNav, expandedNavBar:false};  
                    break;                      
              }
        }
    }
});

export const { setMyStoreConfig } = verticalNavOptionsSlide.actions;
export default verticalNavOptionsSlide.reducer;