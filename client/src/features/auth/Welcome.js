import {useSelector} from "react-redux"
import {selectCurrentToken} from "./authSlice"
import {Link, useLocation, useNavigate} from "react-router-dom"
import {useGetUserQuery, useSendLogoutMutation} from "./authApiSlice";
import {useEffect} from "react";
import {faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX = /^\/dash\/notes(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/


const Welcome = () => {
    const token = useSelector(selectCurrentToken)
    const tokenAbbr = `${token.slice(0, 9)}...`



    const navigate = useNavigate()
    const {pathname} = useLocation()


    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    const { data: user, isLoading: isLoadingUser, isError: isErrorUser, error: errorUser } = useGetUserQuery();

    const handleBothClicks = () => {
        sendLogout();
        navigate('/login')
    };

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    if (isLoading) return <p>Logging Out...</p>

    if (isError) return <p>Error: {error.data?.message}</p>

    if (isLoadingUser) {
        return <div>Loading...</div>;
    }

    if (isErrorUser) {
        return <div>Error: {errorUser.message}</div>;
    }

     console.log(user);

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
            <h1>Welcome {user.username} !</h1>
            <h2>Your email {user.email}</h2>
            <p>Your Activation Status: {user.isActivated.toString()}</p>
            <p>Token: {tokenAbbr}</p>
            <p><Link to="/userslist">Go to the Users List</Link></p>
            <p><Link to="/">Go to the Home page</Link></p>
            {logoutButton}
        </section>
    );
}
export default Welcome