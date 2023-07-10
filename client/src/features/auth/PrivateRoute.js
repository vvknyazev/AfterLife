import {Outlet, useNavigate} from "react-router-dom"
import React from 'react'
import {useGetUserQuery} from "./authApiSlice"
import {useGetOauthUserQuery} from "../commonApiSlice";

const   PrivateRoute = () => {

    const navigate = useNavigate();

    console.log('privateRoute');

    const { data: user} = useGetUserQuery();
    const { data: oauthUserData } = useGetOauthUserQuery();

    if (user) {
        if (user.isActivated) {
            navigate('/');
        } else {
            return <Outlet/>
        }
    } else if (oauthUserData){
        navigate('/');
    }
    else{
        return <Outlet/>
    }



}
export default PrivateRoute