import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "utils/useLocalStorage";
import { clearStore, setUserDetail } from "./redux.utils";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage("token", null);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userDetails);

  const getUser = useCallback(async () => {
    try {
      if (token) {
        return token;
      }
    } catch (err) {
      console.log("err", err);
      clearStore();
      setToken(null);
      navigate("/auth/login");
    }
  }, [navigate, setToken, token]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const login = useCallback(
    async (data) => {
      setToken("Token");
      setUserDetail(data);
      window.location.reload();
    },
    [setToken]
  );

  const logout = useCallback(() => {
    clearStore();
    setToken(null);
    navigate("/", { replace: true });
  }, [setToken, navigate]);

  const value = useMemo(
    () => ({
      token,
      login,
      logout,
      user,
    }),
    [token, login, logout, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
