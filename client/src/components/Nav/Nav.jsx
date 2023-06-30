import React, {useEffect, useRef, useState} from 'react';
import {ReactComponent as CaretIcon} from '../../icons/profile.svg';
import {ReactComponent as SettingsIcon} from '../../icons/settings.svg';
import {ReactComponent as SignUpIcon} from '../../icons/signup.svg';
import {ReactComponent as LoginIcon} from '../../icons/login.svg';
import n from './Nav.module.css'
import {CSSTransition} from 'react-transition-group';
import {NavLink, useLocation} from "react-router-dom";

function NavItem(props) {
    const [open, setOpen] = useState(false);
    const [isFistTimeOpen, setIsFistTimeOpen] = useState(false);

    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);


    // useOnClickOutside(dropdownRef, () => setOpen(false));

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                console.log(dropdownRef.current);

                setOpen(false);
                setIsFistTimeOpen(true);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    // if (isLoadingUser) {
    //     return <div className={'loader'}>
    //         <InfinitySpin
    //             width='200'
    //             color="#000"
    //         />
    //     </div>
    // }
    function calcHeight(el) {
        const height = el.offsetHeight;
        setMenuHeight(height);
    }

    function DropdownItem(props) {
        return (
            <NavLink to={props.auth} className="menu-item">
                <span className="icon-button">{props.leftIcon}</span>
                {props.children}
            </NavLink>
        );
    }

    function toggleFirstTimeOpenVar() {
        setIsFistTimeOpen(false);
    }

    return (
        <div>
            {!isFistTimeOpen &&
                <a href={undefined} className={n.profile} onClick={() => setOpen(!open)}>
                    {props.isActivated ?
                        <img src={props.icon} alt="profile"
                                              className={n.profileLogin}/>
                        :
                        <img src={'profile.svg'} alt="profile"
                             className={n.profileLogin}/>
                    }

                </a>
            }
            {isFistTimeOpen &&
                <a href={undefined} className={n.profile} onClick={() => {
                    toggleFirstTimeOpenVar();
                    setOpen(true)
                }
                }>
                    {props.isActivated ?
                        <img src={props.icon} alt="profile"
                             className={n.profileLogin}/>
                        :
                        <img src={'profile.svg'} alt="profile"
                             className={n.profileLogin}/>
                    }
                </a>
            }

            {open &&
                <div className="dropdown" style={{height: menuHeight}} ref={dropdownRef}>
                    {!props.isLoggedIn || props.isActivated === null || props.isActivated === undefined || !props.isActivated   // или аккаунт не активирован
                        ? <CSSTransition
                            in={activeMenu === 'main'}
                            timeout={500}
                            classNames="menu-primary"
                            unmountOnExit
                            onEnter={calcHeight}>
                            <div className="menu">
                                <DropdownItem
                                    leftIcon={<SignUpIcon/>}
                                    auth='/register'
                                >
                                    Sign Up
                                </DropdownItem>
                                <DropdownItem
                                    leftIcon={<LoginIcon/>}
                                    auth='/login'
                                >
                                    Log In
                                </DropdownItem>
                            </div>
                        </CSSTransition>
                        :
                        <CSSTransition
                            in={activeMenu === 'main'}
                            timeout={500}
                            classNames="menu-primary"
                            unmountOnExit
                            onEnter={calcHeight}>
                            <div className="menu">
                                <DropdownItem
                                    leftIcon={<CaretIcon/>}
                                    auth='/welcome'
                                >
                                    Profile
                                </DropdownItem>
                                <DropdownItem
                                    leftIcon={<SettingsIcon/>}
                                    auth='/settings'
                                >
                                    Settings
                                </DropdownItem>
                            </div>
                        </CSSTransition>
                    }

                </div>}
        </div>

    );
}

const Nav = (props) => {
    // console.log('ISLOGGED IN IN NAV', props.isLoggedIn);
    const location = useLocation();
    // const isHomePage = location.pathname === '/';
    const isModelsPage = location.pathname === '/models';
    // const isSettingsPage = location.pathname === '/settings';
    // const isWelcomePage = location.pathname === '/welcome';
    let profileButtonStyle;
    if (isModelsPage) {
        profileButtonStyle = 'profileBlack'
    } else {
        profileButtonStyle = 'profile';
    }
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [isActivated, setIsActivated] = useState(false);
    //
    // useEffect(() => {
    //     if (props.user || props.photo || props.userPicture) {
    //         setIsLoggedIn(true);
    //         setIsActivated(true);
    //     }
    // })

    console.log("USER: ", props.user)
    console.log("oauthUser: ", props.oauthUser)
    return (
        <div>
            {/*<Menu customBurgerIcon={<img src="/BurgerButton.svg" alt={'burger icon'}/>}/>*/}
            <div className={n.nav}>
                <div>
                    <ul>
                        <li><NavLink to="/models" className={isModelsPage ? `${n.navItem} ${n.active}` : n.navItem}>Выбрать
                            пару</NavLink></li>
                        <li><NavLink to="#" className={n.navItem}>Подписки</NavLink></li>
                        <li><NavLink to='/' className={n.logo}>Afterlife</NavLink></li>
                        <li><NavLink to="#" className={n.navItem}>О нас</NavLink></li>
                        <li><NavLink to="#" className={n.navItem}>FAQs</NavLink></li>
                        {props.user ? <li className={n.rightSide}>
                            <a href="#"><img src="/nav/lang-button.svg" alt="lang" className={n.lang}/></a>
                            <div className={`${profileButtonStyle}`}>
                                <NavItem icon={props.user.photo} isLoggedIn={true}
                                         isActivated={props.user.isActivated}></NavItem>
                            </div>
                        </li> : props.oauthUser ? <li className={n.rightSide}>
                            <a href="#"><img src="/nav/lang-button.svg" alt="lang" className={n.lang}/></a>
                            <div className={`${profileButtonStyle}`}>
                                <NavItem icon={props.oauthUser.user.photo} isLoggedIn={true}
                                         isActivated={true}></NavItem>
                            </div>
                        </li> : <li className={n.rightSide}>
                            <a href="#"><img src="/nav/lang-button.svg" alt="lang" className={n.lang}/></a>
                            <div className={`${profileButtonStyle}`}>
                                <NavLink to={'/login'} className={n.profileText}>Войти</NavLink>
                            </div>
                        </li>}


                        {/*{props.userPicture ? <li className={n.rightSide}>*/}
                        {/*    <a href="#"><img src="/nav/lang-button.svg" alt="lang" className={n.lang}/></a>*/}
                        {/*    <div className={`${profileButtonStyle}`}>*/}
                        {/*        <NavItem icon={props.userPicture} isLoggedIn={isLoggedIn} isActivated={isActivated}></NavItem>*/}
                        {/*    </div>*/}
                        {/*    /!*style here*!/*/}
                        {/*</li> : props.photo ? <li className={n.rightSide} style={{marginRight: "40px", marginTop: "1px", paddingLeft:"53px"}}>*/}
                        {/*        <NavItem icon={props.photo} isLoggedIn={isLoggedIn} isActivated={isActivated}>*/}

                        {/*        </NavItem>*/}

                        {/*    </li>*/}
                        {/*    : props.user ? <li className={n.rightSide}>*/}
                        {/*        <a href="#"><img src="/nav/lang-button.svg" alt="lang" className={n.lang}/></a>*/}
                        {/*        <div className={`${profileButtonStyle}`}>*/}
                        {/*            <NavItem icon={props.user.user.photo} isLoggedIn={isLoggedIn} isActivated={isActivated}></NavItem>*/}
                        {/*        </div>*/}
                        {/*    </li> : <li className={n.rightSide}>*/}
                        {/*        <a href="#"><img src="/nav/lang-button.svg" alt="lang" className={n.lang}/></a>*/}
                        {/*        <div className={`${profileButtonStyle}`}>*/}
                        {/*            <NavLink to={'/login'} className={n.profileText}>Войти</NavLink>*/}
                        {/*        </div>*/}
                        {/*    </li>}*/}

                    </ul>


                    {/*{props.photo ? <div className={n.rightSide}>*/}
                    {/*    <a href="#"><img src="/nav/lang-button.svg" alt="lang" className={n.lang}/></a>*/}
                    {/*    <NavLink to={'/login'}><img src="/nav/profile-logo-back.svg" alt="profile"*/}
                    {/*                                className={n.profile}/></NavLink>*/}
                    {/*</div> : <div className={n.rightSide}>*/}
                    {/*    <a href="#"><img src="/nav/lang-button.svg" alt="lang" className={n.lang}/></a>*/}
                    {/*    <NavLink to={'/login'}><img src="/nav/login-button.svg" alt="profile"*/}
                    {/*                                className={n.profile}/></NavLink>*/}
                    {/*</div>*/}
                    {/*}*/}


                    {/*<a href="#"><img src="/lang.svg" alt="lang" className={n.lang}/></a>*/}
                    {/*/!*<a href="#"><img src="/profile.svg" alt="profile" className={n.profile}/></a>*!/*/}
                    {/*<NavItem icon={<CaretIcon/>} isLoggedIn={props.isLoggedIn} isActivated={props.isActivated}/>*/}
                </div>

            </div>

        </div>
    );
};

export default Nav;