import React, {useEffect} from 'react';
import {Outlet, useNavigate, useOutletContext} from "react-router-dom";

const RequireAdminRole = () => {
    const [user] = useOutletContext();
    console.log(user);
    const navigate = useNavigate();

    useEffect(()=>{
        if (user?.role !== "ADMIN"){
            navigate('/')
        }
    },[user, navigate])

    console.log(user?.role);
    if (user?.role === "ADMIN") {
        console.log('TRUE');
        return <Outlet context={[user]}/>;
    }
};

export default RequireAdminRole;