import { createSlice } from "@reduxjs/toolkit";
// Slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
  },
  reducers: {
    setUser: (state, action) => {
      const { uid, displayName, email, photoURL } = action.payload;
      state.currentUser = { uid, displayName, email, photoURL };
    },
    clearUser: (state, action) => {
      state.currentUser = null;
    },
  },
});
export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
