import {Outlet, useNavigate} from "react-router-dom"
import React from 'react'
import {useGetUserQuery} from "./authApiSlice"

const   PrivateRoute = () => {

    const navigate = useNavigate();

    console.log('privateRoute');

    const { data: user} = useGetUserQuery();

    if (user) {
        if (user.isActivated) {
            navigate('/');
        } else {
            return <Outlet/>
        }
    } else{
        return <Outlet/>
    }



}
export default PrivateRoute