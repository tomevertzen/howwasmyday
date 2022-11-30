import useAuthStore from "../app/authStore";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = ({ allowedRoles }) => {
  const authStore = useAuthStore();

  return authStore?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : authStore?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export default PrivateRoutes;
