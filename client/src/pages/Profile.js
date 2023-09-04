import {NavLink, useLocation, useNavigate, useOutletContext} from "react-router-dom"
import {useSendLogoutMutation} from "../features/auth/authApiSlice";
import React, {useEffect} from "react";
import {faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {InfinitySpin} from "react-loader-spinner";
import Nav from "../components/Nav/Nav";
import s from "./Profile.module.css"
import MiniNav from "../components/MiniNav/MiniNav";

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
            <MiniNav/>
            <section className="welcome">

                <div className={s.header}>

                    {/*<div className={s.layer}></div>*/}
                    <div className={s.greetings}>
                        <span>Welcome <br/> {user?.username || oauthUser?.user.username}</span>
                    </div>
                    <div>
                        <img src={`${process.env.REACT_APP_API_URL}/${user?.photo}` || `${process.env.REACT_APP_API_URL}/${oauthUser?.user?.photo}`} alt="profile-photo"/>
                    </div>
                    <div className={s.description}>
                        <p className={s.name}>{user?.name || oauthUser?.user.name}</p>
                        <p className={s.bio}>{user?.bio || oauthUser?.user.bio}</p>
                    </div>
                    <div className={s.edit}>
                        <NavLink to={'/settings'} className={s.secondButton}>Редактировать</NavLink>
                    </div>
                </div>

                {/*<h1>Добро пожаловать </h1>*/}
                {/*<h2>Your email {user?.email || oauthUser?.user.email}</h2>*/}
                {/*<h3>Name: {user?.name || oauthUser?.user?.name}</h3>*/}
                {/*<h3>BIO: {user?.bio || oauthUser?.user?.bio}</h3>*/}
                {/*<NavLink to="/" style={{marginTop: '15px'}}>Go to the Home page</NavLink>*/}
                {logoutButton}
            </section>
        </div>
    );
}
export default Profile