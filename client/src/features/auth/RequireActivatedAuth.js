import React, {useEffect} from 'react';
import {useGetUserQuery} from "./authApiSlice";
import {Outlet, useNavigate, useOutletContext} from "react-router-dom";
import {InfinitySpin} from "react-loader-spinner";

const RequireActivatedAuth = () => {
    const navigate = useNavigate();
    const { data: user, isLoading: isLoadingUser, isFetching, isSuccess} = useGetUserQuery();

    const [renderOutlet, setRenderOutlet] = React.useState(false);

    const [socket] = useOutletContext();

    useEffect(() => {
        if (isSuccess) {
            if (user) {
                if (user.isActivated) {
                    setRenderOutlet(true);
                } else {
                    navigate('/');
                }
            } else navigate('/');
        }
    }, [isSuccess, user, navigate]);

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

    if (isSuccess && renderOutlet) {
        return <Outlet context={[user, socket]}/>;
    } else {
        return <div></div>;
    }



};

export default RequireActivatedAuth;