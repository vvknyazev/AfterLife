import {useSelector} from "react-redux"
import {selectCurrentToken} from "./authSlice"
import {Link, useLocation, useNavigate} from "react-router-dom"
import {useGetUserQuery, useSendLogoutMutation} from "./authApiSlice";
import React, {useEffect} from "react";
import {faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {InfinitySpin} from "react-loader-spinner";
import {useGetGoogleUserQuery} from "./googleApiSlice";

const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX = /^\/dash\/notes(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/


const Welcome = () => {
    const token = useSelector(selectCurrentToken)
    const tokenAbbr = `${token?.slice(0, 9)}...`



    const navigate = useNavigate()
    const {pathname} = useLocation()

    const { data: user, isLoading: isLoadingUser, isError: isErrorUser, error: errorUser } = useGetUserQuery();
    const { data: googleUserData, error: googleUserError, isLoading: isGoogleUserLoading } = useGetGoogleUserQuery();

    // useEffect(() => {
    //     if ()
    //     navigate('/login')
    // },[])

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()


    const handleBothClicks = () => {
        if (user) {
            sendLogout();
            navigate('/login')
        } else if (googleUserData){
            window.open(`${process.env.REACT_APP_API_URL}api/user/google/logout`, "_self");
        }
    };

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    if (isLoading) {
        return <div className={'loader'}>
            <InfinitySpin
                width='200'
                color="#000"
            />
        </div>
    }

    if (isError) return <p>Error: {error.data?.message}</p>

    if (isLoadingUser) {
        return <div className={'loader'}>
            <InfinitySpin
                width='200'
                color="#000"
            />
        </div>;
    }

    if (isErrorUser) {
        return <div>Error: {errorUser.message}</div>;
    }

     // console.log(user);

    let dashClass = null
    if (!DASH_REGEX.test(pathname) && !NOTES_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
        dashClass = "dash-header__container--small"
    }

    const logoutButton = (
        <button
            className="icon-button"
            title="Logout"
            onClick={handleBothClicks}
        >
            <FontAwesomeIcon icon={faRightFromBracket}/>
        </button>
    )


    return (
        <section className="welcome">
            <h1>Welcome {user?.username || googleUserData?.user.username} !</h1>
            <h2>Your email {user?.email || googleUserData?.user.email}</h2>
            <p><Link to="/userslist">Go to the Users List</Link></p>
            <p><Link to="/">Go to the Home page</Link></p>
            {logoutButton}
        </section>
    );
}
export default Welcome