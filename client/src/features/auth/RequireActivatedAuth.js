import React, {useEffect, useState} from 'react';
import {useGetUserQuery} from "./authApiSlice";
import {Outlet, useNavigate} from "react-router-dom";
import {InfinitySpin} from "react-loader-spinner";

const RequireActivatedAuth = () => {
    const navigate = useNavigate();
    const {data: user, isLoading: isLoadingUser, isFetching, isSuccess, isError: isErrorUser, error: errorUser} = useGetUserQuery();

    const [renderOutlet, setRenderOutlet] = React.useState(false);
    const [navg, setNavg] = useState(false);
    // useEffect(()=>{
    //    setNavg(false);
    // },[])

    // useEffect(()=>{
    //     if (isSuccess){
    //         if (user){
    //             if (user.isActivated){
    //                 setRenderOutlet(true);
    //             }else{
    //                 navigate('/')
    //             }
    //         }
    //     }
    // },[user])

    // useEffect(()=>{
    //     navigate('/');
    // },[navg])

    if (isLoadingUser) {
        return <div className={'loader'}>
            <InfinitySpin
                width='200'
                color="#000"
            />
        </div>
    }
    if (isFetching) {
        return <div className={'loader'}>
            <InfinitySpin
                width='200'
                color="#000"
            />
        </div>
    }
    if (isSuccess){
        console.log(user);
    }


    // if (renderOutlet) {
    //     return <Outlet />;
    // } else {
    //     return null;
    // }


    if (isSuccess) {
        if (user) {
            if (user.isActivated) {
                return <Outlet/>
            } else {
                navigate('/');
            }
        } else navigate('/');
    } else return <div>not isSuccess</div>
};

export default RequireActivatedAuth;