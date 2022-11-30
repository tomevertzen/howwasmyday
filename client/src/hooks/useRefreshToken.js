import axios from "../api/axios";
import useAuthStore from "../app/authStore";

const useRefreshToken = () => {
  //Retrieve the function to set the new token accessToken
  const authStore = useAuthStore();

  //Call the refresh token endpoints
  const refresh = async () => {
    const response = await axios.get("/users/refresh", {
      withCredentials: true,
    });
    console.log(authStore);
    //Set the new token accessToken
  };
  return refresh;
};

export default useRefreshToken;
