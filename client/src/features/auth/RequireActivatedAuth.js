import React, {useEffect} from 'react';
import {useGetUserQuery} from "./authApiSlice";
import {Outlet, useNavigate} from "react-router-dom";
import {InfinitySpin} from "react-loader-spinner";
import {useGetOauthUserQuery} from "../commonApiSlice";

const RequireActivatedAuth = () => {
    const navigate = useNavigate();
    const { data: user, isLoading: isLoadingUser, isFetching, isSuccess} = useGetUserQuery();

    const { data: oauthUserData } = useGetOauthUserQuery();

    const [renderOutlet, setRenderOutlet] = React.useState(false);
    // const [navg, setNavg] = useState(false);

    useEffect(() => {
        if (isSuccess) {
            if (user) {
                if (user.isActivated) {
                    setRenderOutlet(true);
                } else {
                    navigate('/');
                }
            } else if (oauthUserData){
                setRenderOutlet(true);
            }else navigate('/');
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
        return <Outlet context={[user, oauthUserData]}/>;
    } else {
        return <div></div>;
    }



};

export default RequireActivatedAuth;