import useAuthStore from "../app/authStore";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const { token } = useAuthStore();
  console.log(token);

  return token ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoutes;
