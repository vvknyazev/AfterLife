import {NavLink, useLocation, useNavigate, useOutletContext} from "react-router-dom"
import {useSendLogoutMutation} from "../features/auth/authApiSlice";
import React, {useEffect, useState} from "react";
import {faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {InfinitySpin} from "react-loader-spinner";
import Nav from "../components/Nav/Nav";
import s from "./Profile.module.css"
import Films from "../components/Spotlight/Films/Films";
import Games from "../components/Spotlight/Games/Games";
import Music from "../components/Spotlight/Music/Music";
import ImageComponent from "../components/ImageComponent/ImageComponent";

const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX = /^\/dash\/notes(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/


const Profile = () => {

    const navigate = useNavigate()
    const {pathname} = useLocation()

    const [user] = useOutletContext();

    const [activeCategory, setActiveCategory] = useState('Смотрю');

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
    };

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
        }
        // else if (oauthUser) {
        //     window.open(`${process.env.REACT_APP_API_URL}/api/user/google/logout`, "_self");
        // }
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
            <Nav user={user}/>
            {/*<MiniNav/>*/}
            <section className={s.profileContainer}>
                <div>
                    <div className={s.topGames}>
                        <div className={s.centerGame}>
                            <img src="/profile/top-games/bioshock.jpg" alt="bioshock.jpg"/>
                        </div>
                        <div className={s.darkGameLeft}>
                            <img src="/profile/top-games/lol.jpg" alt="lol.jpg"/>
                        </div>

                        <div className={s.darkGameRight}>
                            <img src="/profile/top-games/witcher.jpg" alt="witcher.jpg"/>
                        </div>
                    </div>
                    <div className={s.headerInfo}>
                        <div className={s.profileImage}>
                            <ImageComponent
                                hash={'L6D]o5NL00-5~Cxu0LMw-UayNxjb'}
                                width={'213px'}
                                height={'213px'}
                                src={user?.photo.includes('http') ? user?.photo : `${process.env.REACT_APP_API_URL}/${user?.photo}`}
                                alt="profile-photo"
                            />
                        </div>
                        <div className={s.headerDescription}>
                            <p className={s.name}>{user?.username}</p>
                            <p className={s.nameTag}>{`@${user?.username}`}</p>
                        </div>
                        <div className={s.connectContainer}>
                            <NavLink to={''} className={s.connect}>Пригласить</NavLink>
                        </div>
                    </div>
                    <div className={s.contentBackground}>
                        <div className={s.content}>
                            <div className={s.shining2}></div>
                            <div className={s.descContainer}>
                                <div className={s.info}>
                                    <div className={s.shining}></div>
                                    <div className={s.shiningBackground}>
                                        <div className={s.smallBio}>
                                            <div className={s.smallBioItem}>
                                                <h4>8.7</h4>
                                                <p>Рейтинг</p>
                                            </div>
                                            <div className={s.smallBioItem}>
                                                <h4>52</h4>
                                                <p>Сессии</p>
                                            </div>
                                            <div className={`${s.smallBioItem} ${s.achievements}`}>
                                                <div>
                                                    <img src="/profile/achievements/1.png" alt="1"/>
                                                    <img src="/profile/achievements/2.png" alt="2"/>
                                                    <img src="/profile/achievements/3.png" alt="3"/>
                                                </div>
                                                <p>Достижения</p>
                                            </div>
                                        </div>
                                        <div className={s.infoBio}>
                                            <h3>Обо мне</h3>
                                            <p>{user?.bio ? user.bio : 'Пусто...'}</p>
                                        </div>
                                        <div className={s.langBio}>
                                            <div className={s.langBioItem}><p>Русский</p></div>
                                            <div className={s.langBioItem}><p>Українська</p></div>
                                            <div className={s.langBioItem}><p>English</p></div>
                                        </div>
                                    </div>
                                </div>
                                <div className={s.spotlight}>
                                    <div className={s.shiningBackground2}>
                                        <h3>Spotlight</h3>
                                        <div className={s.categories}>
                                            <div
                                                className={`${s.categoriesItem} ${activeCategory === 'Смотрю' ? s.active : ''}`}
                                                onClick={() => handleCategoryChange('Смотрю')}
                                            >
                                                <p>Смотрю</p>
                                            </div>
                                            <div
                                                className={`${s.categoriesItem} ${activeCategory === 'Играю' ? s.active : ''}`}
                                                onClick={() => handleCategoryChange('Играю')}
                                            >
                                                <p>Играю</p>
                                            </div>
                                            <div
                                                className={`${s.categoriesItem} ${activeCategory === 'Слушаю' ? s.active : ''}`}
                                                onClick={() => handleCategoryChange('Слушаю')}
                                            >
                                                <p>Слушаю</p>
                                            </div>
                                        </div>

                                        {activeCategory === 'Смотрю' && <Films />}
                                        {activeCategory === 'Играю' && <Games />}
                                        {activeCategory === 'Слушаю' && <Music />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={s.contentBackground}>
                        <div className={s.secondBlockContainer}>
                            <div className={s.secondBlock}>
                                <div className={s.activity}>
                                    <h3>Активности</h3>
                                    <div className={s.activityItems}>
                                        <ImageComponent hash={'LLC~xFRjR.M|~UR*f7WBMxafaxof'} width={'216px'} height={'324px'} src="/profile/activity/watch.png" alt="watch"/>
                                        <ImageComponent hash={'LcK,]Wxt_MkWrDbHtRoL?HNGWBen'} width={'216px'} height={'324px'}  src="/profile/activity/apex.jpg" alt="apex"/>
                                        <ImageComponent hash={'LJL-s{0%0kEj}nEj$$NI^3WXs-Nd'} width={'216px'} height={'324px'}  src="/profile/activity/cs2.png" alt="cs2"/>
                                        <ImageComponent hash={'LSI}#D%MxVNH%jkCRoaxK8RPIpjF'} width={'216px'} height={'324px'}  src="/profile/activity/genshin.png" alt="genshin"/>
                                        <ImageComponent hash={'L371fuV?0Lxv^$j?JDofZyNG-=V?'} width={'216px'} height={'324px'}  src="/profile/activity/aoe.png" alt="aoe"/>
                                        <ImageComponent hash={'LiHT$+o0NHWB~TkCNHWC-.oLM}WV'} width={'216px'} height={'324px'}  src="/profile/activity/dota2.png" alt="dota2"/>
                                    </div>
                                </div>
                                <div className={s.friends}>
                                    <img src="/profile/friends-logo.png" alt="friends-logo"/>
                                    <div className={s.friendsList}>
                                        {Array.from({length: 5}).map((_, index) => (
                                            <div key={index} className={s.friendItem}>
                                                <div><img src="/profile/friend.png" alt="friend-ava"/></div>
                                                <div className={s.friendInfo}>
                                                    <h4>Victoria</h4>
                                                    <p>@Saigon</p>
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={s.x}>
                        <h2>{`${user?.name}'s `} <img src="/profile/x-logo.svg" alt="x-logo"/></h2>
                    </div>
                </div>

                {/*{logoutButton}*/}
            </section>
        </div>
    );
}
export default Profile