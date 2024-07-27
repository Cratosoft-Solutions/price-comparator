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
                  state.myStoreNav = {...state.myStoreNav, selectedOption:"configuration", editMode:false, product:""};     
                  break;
                case "ADDPRODUCT":
                  state.myStoreNav = {...state.myStoreNav, selectedOption:"products", editMode:false, product:""};  
                  break;
                case "LISTITEM":
                state.myStoreNav = {...state.myStoreNav, selectedOption:"myproducts", editMode:false, product:""};  
                break;
                case "EXPANDNAV":
                    state.myStoreNav = {...state.myStoreNav, expandedNavBar:true};  
                    break;  
                case "COLLAPSENAV":
                    state.myStoreNav = {...state.myStoreNav, expandedNavBar:false};  
                    break;                      
              }
        },
        setEditionModeOn: (state, action) => {
            state.myStoreNav = {...state.myStoreNav, selectedOption:"products", editMode:true, product:action.payload};  
        },
        setProductSearchConfig: (state, action) => {
            switch (action.payload) {
                case "EXPANDNAV":
                    state.productSearch = {...state.productSearch, expandedNavBar:true};  
                    break;  
                case "COLLAPSENAV":
                    state.productSearch = {...state.productSearch, expandedNavBar:false};  
                    break; 
                default: 
                    state.productSearch = {...state.productSearch, selectedOption:action.payload};  
                    break;                      
              }
        }
    }
});

export const { setMyStoreConfig, setProductSearchConfig, setEditionModeOn } = verticalNavOptionsSlide.actions;
export default verticalNavOptionsSlide.reducer;