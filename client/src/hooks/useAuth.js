import { useDebugValue } from "react";
import useAuthStore from "../app/authStore";

const useAuth = () => {
  const { token } = useAuthStore();
  useDebugValue(token ? "Authenticated" : "Not Authenticated");
  return useAuthStore;
};

export default useAuth;
