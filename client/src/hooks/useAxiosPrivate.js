import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";

const useAxiosPrivate = () => {

    useEffect(() => {
        const responseIntercept = axiosPrivate.interceptors.response.use()

    return axiosPrivate;
},[]);

export default useAxiosPrivate;
