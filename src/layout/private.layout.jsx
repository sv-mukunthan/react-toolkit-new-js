import MainLayout from "common_components/hoc/main.hoc";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "utils/useAuthContext";

export const PrivateLayout = ({ router, sidebar }) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  if (sidebar) {
    return (
      <MainLayout items={router}>
        <Outlet />
      </MainLayout>
    );
  }
  return <Outlet />;
};
