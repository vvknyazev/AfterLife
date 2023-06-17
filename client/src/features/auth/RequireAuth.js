import {useLocation, Navigate, Outlet} from "react-router-dom"
import {useSelector} from "react-redux"
import {selectCurrentToken} from "./authSlice"
import React from "react";
import {useGetGoogleUserQuery} from "./googleApiSlice";


const RequireAuth = () => {
    const token = useSelector(selectCurrentToken)
    const location = useLocation()

    const { data: googleUserData, error: googleUserError, isLoading: isGoogleUserLoading } = useGetGoogleUserQuery();

    // console.log("going to requareAuth + token: ", token);

    return (
        token || googleUserData
            ? <Outlet/>
            : <Navigate to="/login" state={{from: location}} replace/>
    )
}
export default RequireAuth