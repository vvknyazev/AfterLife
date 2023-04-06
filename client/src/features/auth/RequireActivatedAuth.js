import React from 'react';
import {useGetUserQuery} from "./authApiSlice";
import {Outlet, useNavigate} from "react-router-dom";
import {InfinitySpin} from "react-loader-spinner";

const RequireActivatedAuth = () => {
    const navigate = useNavigate();
    const {data: user, isLoading: isLoadingUser, isError: isErrorUser, error: errorUser} = useGetUserQuery();
    if (isLoadingUser) {
        return <div className={'loader'}>
            <InfinitySpin
                width='200'
                color="#000"
            />
        </div>
    }
    if (user) {
        if (user.isActivated) {
            return <Outlet/>
        } else {
            navigate('/');
        }
    } else navigate('/');
};

export default RequireActivatedAuth;