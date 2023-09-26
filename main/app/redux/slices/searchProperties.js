import { createSlice } from "@reduxjs/toolkit";
import { CATEGORIES } from "@utils/constants";

const initialState = {
  properties: { text: 'NO_TEXT', category: CATEGORIES[0].value},
};

const searchProperties = createSlice({
  name: "searchProperty",
  initialState,
  reducers: {
    setText: (state, action) => {
          state.properties = {
            ...state.properties,
            text:action.payload
          };
      },
      setCategory: (state, action) => {
        state.properties = {
            ...state.properties,
            category:action.payload
          };
    }
  },
});

export const { setCategory, setText, setProgress } = searchProperties.actions;
export default searchProperties.reducer;
