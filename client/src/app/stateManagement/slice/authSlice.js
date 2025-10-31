import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   userToken: "",
   userDetails: "",
   darkmode: false
}

const authSlice = createSlice({
   name: 'userAuth',
   initialState,
   reducers: {
      logIn: (state, action) => {
         state.userToken = action.payload
      },

      logOut: (state) => {
         localStorage.removeItem('userToken');
         state.userToken = "";
         state.userDetails = "";
         state.darkmode = false;

      },

      setUserDetails: (state, action) => {
         state.userDetails = action.payload
      },

      setDarkMode: (state) => {
         state.darkmode = !state.darkmode
      }
   }
})

export const { logIn, logOut, setUserDetails, setDarkMode } = authSlice.actions;
export default authSlice.reducer;