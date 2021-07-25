import { createSlice } from "@reduxjs/toolkit";
// Slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
  },
  reducers: {
    registerSuccess: (state, action) => {
      state.user = action.payload.currentUser;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.currentUser;
    },
    logoutSuccess: (state, action) => {
      state.user = null;
    },
  },
});
export const { loginSuccess, logoutSuccess } = userSlice.actions;
export default userSlice.reducer;
