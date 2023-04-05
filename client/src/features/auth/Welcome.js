import {useSelector} from "react-redux"
import {selectCurrentToken} from "./authSlice"
import {Link, useLocation, useNavigate} from "react-router-dom"
import {useSendLogoutMutation} from "./authApiSlice";
import {useEffect} from "react";
import {faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import jwt_decode from 'jwt-decode';

const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX = /^\/dash\/notes(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/


const Welcome = () => {
    const token = useSelector(selectCurrentToken)
    const auth = useSelector((state) => state.auth);
    const tokenAbbr = `${token.slice(0, 9)}...`

    // take data using jwt decode

    const decoded = auth?.token ? jwt_decode(auth.token) : undefined;
    const username = decoded?.username;
    const email = decoded?.email;
    console.log("username: ", username);
    console.log("email: ", email);

    // end jwt decode

    const navigate = useNavigate()
    const {pathname} = useLocation()

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    const handleBothClicks = () => {
       sendLogout();
       navigate('/login')
    };

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    if (isLoading) return <p>Logging Out...</p>

    if (isError) return <p>Error: {error.data?.message}</p>

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
            <h1>Welcome {username} !</h1>
            <h2>Your email {email}</h2>
            <p>Token: {tokenAbbr}</p>
            <p><Link to="/userslist">Go to the Users List</Link></p>
            <p><Link to="/">Go to the Home page</Link></p>
            {logoutButton}
        </section>
    );
}
export default Welcome