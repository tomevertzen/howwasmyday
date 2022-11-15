import { useAuthStore } from "../app/authStore";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = () => {
  const auth = useAuthStore();

  return (
    <Route {...rest}>{auth.token ? children : <Redirect to="/signin" />}</Route>
  );
};

export default ProtectedRoute;
