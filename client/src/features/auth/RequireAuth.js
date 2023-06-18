import {useLocation, Navigate, Outlet} from "react-router-dom"
import {useSelector} from "react-redux"
import {selectCurrentToken} from "./authSlice"
import React from "react";
import {useGetOauthUserQuery} from "./commonApiSlice";


const RequireAuth = () => {
    const token = useSelector(selectCurrentToken)
    const location = useLocation()

    const { data: oauthUserData } = useGetOauthUserQuery();

    // console.log("going to requareAuth + token: ", token);

    return (
        token || oauthUserData
            ? <Outlet/>
            : <Navigate to="/login" state={{from: location}} replace/>
    )
}
export default RequireAuth