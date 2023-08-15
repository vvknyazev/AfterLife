import {useLocation, Navigate, Outlet, useOutletContext} from "react-router-dom"
import {useSelector} from "react-redux"
import {selectCurrentToken} from "./authSlice"
import React from "react";
import {useGetOauthUserQuery} from "../commonApiSlice";
import {InfinitySpin} from "react-loader-spinner";


const RequireAuth = () => {
    const token = useSelector(selectCurrentToken)
    const location = useLocation()
    const [user, oauthUser, socket] = useOutletContext();
    const { data: oauthUserData, isLoading } = useGetOauthUserQuery();

    console.log("socket in requereAuth: ", socket)

    // console.log("going to requareAuth + token: ", token);
    if (isLoading){
        return <div className={'loader'}>
            <InfinitySpin
                width='200'
                color="#000"
            />
        </div>
    }
    return (
        token || oauthUserData
            ? <Outlet context={[socket]}/>
            : <Navigate to="/login" state={{from: location}} replace/>
    )
}
export default RequireAuth