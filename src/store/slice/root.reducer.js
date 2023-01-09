import userSlice from "./user.slice";
import { combineReducers } from "@reduxjs/toolkit";

const reducers = combineReducers({
  user: userSlice,
});

const rootReducer = (state, action) => {
  if (action.type === "user/logout") {
    state = undefined;
    localStorage.clear();
  }
  return reducers(state, action);
};

export default rootReducer;
