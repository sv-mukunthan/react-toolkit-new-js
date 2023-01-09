import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "utils/useAuthContext";

export const AuthLayout = () => {
  const { token } = useAuth();
  const location = useLocation();
  const route = location.pathname.split("/").filter((path) => path);

  if (token) {
    return <Navigate to="/" replace />;
  } else if (route.length === 1) {
    return <Navigate to="/auth/login" replace />;
  }
  return <Outlet />;
};
