import { createSlice } from "@reduxjs/toolkit";

const user = {
  userDetails: {},
  forgotDetail: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState: user,
  reducers: {
    setUser: (state, action) => {
      state = Object.assign({}, state, { userDetails: action.payload });
      return state;
    },
    forgotEmail: (state, action) => {
      state = Object.assign({}, state, { forgotDetail: action.payload });
      return state;
    },
    logout: (state, action) => {
      console.log("User logout!!!");
    },
  },
});

export const { setUser, logout, forgotEmail } = userSlice.actions;

export default userSlice.reducer;
