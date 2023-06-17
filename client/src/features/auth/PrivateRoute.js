import {Outlet, useLocation, useNavigate} from "react-router-dom"
import React, {useEffect, useRef, useState} from 'react'
import {useGetUserQuery, useRefreshMutation} from "./authApiSlice"
import usePersist from "../../hooks/usePersist"
import {useSelector} from 'react-redux'
import {selectCurrentToken} from "./authSlice"
import {InfinitySpin} from "react-loader-spinner";
import nav from "../../components/Nav/Nav";
import {useGetGoogleUserQuery} from "./googleApiSlice";

const   PrivateRoute = () => {

    // const [persist] = usePersist()
    // const token = useSelector(selectCurrentToken)
    // const effectRan = useRef(false)
    // const location = useLocation();
    // const isHomePage = location.pathname === '/';
    // const isLoginOrRegisterPage = location.pathname === '/login' || location.pathname === '/register';
    // console.log("persist ", persist);
    // const [trueSuccess, setTrueSuccess] = useState(false)
    //
    const navigate = useNavigate();
    //
    // const auth = useSelector((state) => state.auth);
    // //
    // console.log("auth on login page is ", auth);
    // //
    // //
    // const [refresh, {
    //     isUninitialized,
    //     isLoading,
    //     isSuccess,
    //     isError,
    //     error
    // }] = useRefreshMutation()
    //
    // const { data: user, isLoading: isLoadingUser, isError: isErrorUser, error: errorUser } = useGetUserQuery();
    // useEffect(() => {
    //
    //     if (effectRan.current === true || process.env.NODE_ENV !== 'development') { // React 18 Strict Mode
    //
    //         const verifyRefreshToken = async () => {
    //             console.log('verifying refresh token')
    //             try {
    //                 //const response =
    //                 await refresh()
    //                 //const { accessToken } = response.data
    //                 setTrueSuccess(true)
    //             } catch (err) {
    //                 console.error(err)
    //             }
    //         }
    //
    //         if (!token && persist) verifyRefreshToken()
    //     }
    //
    //     return () => effectRan.current = true
    //
    //     // eslint-disable-next-line
    // }, [])
    const { data: user, isLoading: isLoadingUser, isError: isErrorUser, error: errorUser } = useGetUserQuery();
    const { data: googleUserData, error: googleUserError, isLoading: isGoogleUserLoading } = useGetGoogleUserQuery();



    console.log("USER", user)
    if (user) {
        if (user.isActivated) {
            navigate('/');
        } else {
            return <Outlet/>
        }
    } else if (googleUserData){
        navigate('/');
    }
    else{
        return <Outlet/>
    }



}
export default PrivateRoute