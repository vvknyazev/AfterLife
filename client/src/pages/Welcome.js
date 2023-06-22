import {useSelector} from "react-redux"
import {selectCurrentToken} from "../features/auth/authSlice"
import {Link, NavLink, useLocation, useNavigate} from "react-router-dom"
import {useGetUserQuery, useSendLogoutMutation} from "../features/auth/authApiSlice";
import React, {useEffect} from "react";
import {faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {InfinitySpin} from "react-loader-spinner";
import {useGetOauthUserQuery} from "../features/auth/commonApiSlice";
import Nav from "../components/Nav/Nav";

const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX = /^\/dash\/notes(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/


const Welcome = () => {
    // const token = useSelector(selectCurrentToken)
    // const tokenAbbr = `${token?.slice(0, 9)}...`


    const navigate = useNavigate()
    const {pathname} = useLocation()

    const {data: user, isLoading: isLoadingUser, isError: isErrorUser, error: errorUser} = useGetUserQuery();
    const {data: oauthUserData} = useGetOauthUserQuery();

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
        } else if (oauthUserData) {
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
    console.log(oauthUserData)

    return (
        <div style={{background: "#000"}}>
            <Nav photo={user?.photo || oauthUserData?.user.photo}/>
            <section className="welcome">
                <h1>Добро пожаловать <span>{user?.username || oauthUserData?.user.username}</span></h1>
                <h2>Your email {user?.email || oauthUserData?.user.email}</h2>
                {/*<p><Link to="/userslist">Go to the Users List</Link></p>*/}
                <NavLink to="/" style={{marginTop: '15px'}}>Go to the Home page</NavLink>
                {logoutButton}
            </section>
        </div>
    );
}
export default Welcome