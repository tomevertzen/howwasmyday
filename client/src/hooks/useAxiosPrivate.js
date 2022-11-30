import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useAuthStore from "../app/authStore";
import useRefreshToken from "./useRefreshToken";
import React from "react";

function useAxiosPrivate() {
  const refresh = useRefreshToken();

  const authStore = useAuthStore();

  console.log(authStore);

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${authStore?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [authStore, refresh]);

  return axiosPrivate;
}

export default useAxiosPrivate;
