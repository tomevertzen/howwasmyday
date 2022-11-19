import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  //Retrieve the function to set the new token accessToken
  const authStore = useAuth();

  //Call the refresh token endpoints
  const refresh = async () => {
    const response = await axios.get("/users/refresh", {
      withCredentials: true,
    });

    console.log(authStore);
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
