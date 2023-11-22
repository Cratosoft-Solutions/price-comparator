import { createSlice } from "@reduxjs/toolkit";
import { USER_ACCEPTED_CONFIGURATION } from "@utils/constants";

const initialState = USER_ACCEPTED_CONFIGURATION;

const userTerms = createSlice({
  name: "userTermsAccepted",
  initialState,
  reducers: {
    setConfiguration: (state, action) => {
        console.log(action.payload)
          state.userTerms = {
            ...state.userTerms,
            ...action.payload
          };
      }
  },
});

export const { setConfiguration } = userTerms.actions;
export default userTerms.reducer;
