import {Outlet} from "react-router-dom"
import React, {useEffect, useRef, useState} from 'react'
import {useGetUserQuery, useRefreshMutation} from "./authApiSlice"
import usePersist from "../../hooks/usePersist"
import {useSelector} from 'react-redux'
import {selectCurrentToken} from "./authSlice"
import {InfinitySpin} from "react-loader-spinner";
import {useGetOauthUserQuery} from "../commonApiSlice";

const PersistLogin = () => {

    const [persist] = usePersist()
    const token = useSelector(selectCurrentToken)
    const effectRan = useRef(false)
    // const location = useLocation();
    // const isHomePage = location.pathname === '/';
    // const isLoginOrRegisterPage = location.pathname === '/login' || location.pathname === '/register';

    const [trueSuccess, setTrueSuccess] = useState(false)
    // const [googleUser, setGoogleUser] = useState(null);

    const {data: user, isLoading: isLoadingUser, isFetching} = useGetUserQuery();

    const { data: oauthUserData, isLoading: isLoadingOauthUser } = useGetOauthUserQuery();

    // console.log("oauthUserData on persist-page: ", oauthUserData?.user);

    let isLoggedIn = false;

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
    }] = useRefreshMutation()

    useEffect(() => {


        if (effectRan.current === true || process.env.NODE_ENV !== 'development') { // React 18 Strict Mode

            const verifyRefreshToken = async () => {
                console.log('verifying refresh token')
                try {
                    //const response =
                    await refresh()
                    //const { accessToken } = response.data
                    setTrueSuccess(true)
                } catch (err) {
                    console.error(err)
                }
            }

            if (!token && persist) verifyRefreshToken()

        }

        return () => effectRan.current = true

    }, [])



    if (isLoadingUser || isLoadingOauthUser) {
        return <div className={'loader'}>
            <InfinitySpin
                width='200'
                color="#000"
            />
        </div>
    }
    if (oauthUserData){
        console.log('oauthUserData if worked')
        // isLoggedIn = true;
        return <Outlet context={[null, oauthUserData]}/>
    }
    // if (isGoogleUserLoading) {
    //     return <div className={'loader'}>
    //         <InfinitySpin
    //             width='200'
    //             color="#000"
    //         />
    //     </div>
    // }
    if (isFetching) {
        return <div className={'loader'}>
            <InfinitySpin
                width='200'
                color="#000"
            />
        </div>
    }

    // console.log("googleUser: ", googleUser)

    let content

    // if (isErrorUser) {
    //     console.log("This is Persist Login Page (error): ", errorUser);
    //     if (errorUser.status === 401) {
    //         return <Login/>
    //     }
    // }


    if (!persist) { // persist: no
        // console.log('no persist')
        //setIsLoggedIn(false);
        // isLoggedIn = false;
        return <Outlet context={[null, null]}/>
    } else if (isLoading) { //persist: yes, token: no
        // console.log('loading')
        //setIsLoggedIn(false);
        // isLoggedIn = false;
        content = <div className={'loader'}>
            <InfinitySpin
                width='200'
                color="#000"
            />
        </div>
    } else if (isError) { //persist: yes, token: no
        // console.log('error')
        //setIsLoggedIn(false);
        // isLoggedIn = false;
        //if (isHomePage) {
            return <Outlet context={[null, null]}/>
       // }

        // content = (
        //     <p className='errmsg'>
        //         {error.data?.message}
        //         <Link to="/login">Please login again</Link>.
        //     </p>
        // );
    } else if (isSuccess && trueSuccess) { //persist: yes, token: yes
        // console.log('success')
        //  isLoggedIn = true;
        return <Outlet context={[user, null]}/>
    } else if (token && isUninitialized) { //persist: yes, token: yes
        // console.log('token and uninit')
        // console.log(isUninitialized)
        //setIsLoggedIn(true);
        // isLoggedIn = true;
        return <Outlet context={[user, null]}/>
    }
    return content


}
export default PersistLogin