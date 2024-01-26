import {useLocation, Navigate, Outlet, useOutletContext} from "react-router-dom"
import React from "react";

const RequireAuth = () => {
    // const token = useSelector(selectCurrentToken)
    const location = useLocation()
    const [user, socket] = useOutletContext();

    return (
        user?.isActivated === true
            ? <Outlet context={[socket]}/>
            : <Navigate to="/login" state={{from: location}} replace/>
    )
}
export default RequireAuth