import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { authcontext } from "./context";

const useApi = () => {
    const {logout} = useContext(authcontext);
    const [api] = useState(() => {
        const instance = axios.create({
            baseURL: 'https://newecommerce-2.onrender.com',
            headers: {
                "content-type": "application/json",
            }
        });


        instance.interceptors.request.use(config => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        instance.interceptors.response.use(
            (response) => response,
            (error) => {
                if (
                    error.response?.status === 401 ||
                    error.response?.status === 403 ||
                    error.response?.status === 419
                ) {
                    logout();
            
                } else if (error.response?.status === 422) {
                    console.log("error");
                } else {
                    return Promise.reject(error.response);
                }
            }
        );
        return instance;
    });

    return api;
};

export default useApi;
