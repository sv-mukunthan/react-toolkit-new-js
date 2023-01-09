import store from "store/store";
import { setUser, logout, forgotEmail } from "store/slice/user.slice";

export const setUserDetail = (payload) => {
  store.dispatch(setUser(payload));
};

export const clearStore = () => {
  store.dispatch(logout({}));
};

export const setForgotDetails = (payload) => {
  store.dispatch(forgotEmail(payload));
};
