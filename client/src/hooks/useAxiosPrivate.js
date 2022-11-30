import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuthStore from "../app/authStore";

const useAxiosPrivate = () => {

    useEffect(() => {
        const responseIntercept = axiosPrivate.interceptors.response.use()

    return axiosPrivate;
},[]);

export default useAxiosPrivate;
