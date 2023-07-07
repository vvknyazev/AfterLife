import {NavLink, useLocation, useNavigate, useOutletContext} from "react-router-dom"
import {useSendLogoutMutation} from "../features/auth/authApiSlice";
import React, {useEffect} from "react";
import {faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {InfinitySpin} from "react-loader-spinner";
import Nav from "../components/Nav/Nav";

const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX = /^\/dash\/notes(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/


const Profile = () => {
    // const token = useSelector(selectCurrentToken)
    // const tokenAbbr = `${token?.slice(0, 9)}...`


    const navigate = useNavigate()
    const {pathname} = useLocation()

    // const {data: user, isLoading: isLoadingUser, isError: isErrorUser, error: errorUser} = useGetUserQuery();
    // const {data: oauthUserData} = useGetOauthUserQuery();
    const [user, oauthUser] = useOutletContext();

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
        } else if (oauthUser) {
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
        <div>
            <Nav user={user} oauthUser={oauthUser}/>
            <section className="welcome">
                <h1>Добро пожаловать <span>{user?.username || oauthUser?.user.username}</span></h1>
                <h2>Your email {user?.email || oauthUser?.user.email}</h2>
                {/*<p><Link to="/userslist">Go to the Users List</Link></p>*/}
                <h3>Name: {user?.name || oauthUser?.user?.name}</h3>
                <h3>BIO: {user?.bio || oauthUser?.user?.bio}</h3>
                <NavLink to="/" style={{marginTop: '15px'}}>Go to the Home page</NavLink>
                {logoutButton}
            </section>
        </div>
    );
}
export default Profile