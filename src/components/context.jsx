import React, { createContext, useState, useEffect } from 'react';
export const authcontext = createContext();


const AuthContextProvider = (props) => {
    const [isAuthenticated, setAuthenticate] = useState(false);
    const [admin, setAdmin] = useState(false);
    const token = localStorage.getItem('accessToken');
    const logout = () => {
        localStorage.removeItem('accessToken');
        window.location.pathname('/');
    }
    const authenticate = () => {
        setAuthenticate(true);
    }

    const decodeToken=async()=>{
        const module = await import('jwt-decode');
        const jwtDecode = module.default || module.jwtDecode || module.decode;
        const admin = jwtDecode(token);
        setAdmin(admin.user.isAdmin);
    }

    useEffect(()=>{
        if(token){
            setAuthenticate(true);
            decodeToken()
        }
    },[token])

    return(
    <authcontext.Provider value={{admin,authenticate,isAuthenticated,logout}}>
        {props.children}
    </authcontext.Provider>
    )
}
export default AuthContextProvider;
