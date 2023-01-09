import axios from "axios";
import { clearStore } from "utils/redux.utils";

const client = async () => {
  const token = localStorage.getItem("token");
  const instance = await axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-api-key": process.env.REACT_APP_API_SECRET_KEY,
      authorization: "Bearer " + JSON.parse(token),
    },
  });
  instance.interceptors.response.use(undefined, (error) => {
    const statusCode = error.response ? error.response.status : null;
    if (statusCode === 401) {
      localStorage.clear();
      clearStore();
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  });
  return instance;
};

export default client;
