import React, {useEffect, useRef, useState} from 'react';
import {ReactComponent as SignUpIcon} from '../../icons/signup.svg';
import {ReactComponent as LoginIcon} from '../../icons/login.svg';
import n from './Nav.module.css'
import {CSSTransition} from 'react-transition-group';
import {NavLink, useLocation} from "react-router-dom";
import {useChat} from "../../context/ChatProvider";

function NavItem(props) {
    const [open, setOpen] = useState(false);
    const [isFistTimeOpen, setIsFistTimeOpen] = useState(false);

    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);

    const {notifications} = useChat();

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

    function calcHeight(el) {
        const height = el.offsetHeight;
        setMenuHeight(height);
    }

    function DropdownItem(props) {
        return (
            <NavLink to={props.auth} className="menu-item">
                {/*<span className="icon-button">{props.leftIcon}</span>*/}
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
                    {props.isActivated ? <div className={n.notification}>
                            <img src={props.icon} alt="profile"
                                 className={n.profileLogin}/>
                            <div className={notifications.length > 0 ? n.notificationVar : ''}>
                                <h3>{notifications.length > 9 ? '9+' : notifications.length > 0 ? notifications.length : ''}</h3>
                            </div>
                        </div>
                        :
                        <div className={n.notification}>
                            <img src={props.icon} alt="profile"
                                 className={n.profileLogin}/>
                            <div className={notifications.length > 0 ? n.notificationVar : ''}>
                                <h3>{notifications.length > 9 ? '9+' : notifications.length > 0 ? notifications.length : ''}</h3>
                            </div>
                        </div>
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
                        <div className={n.notification}>
                            <img src={props.icon} alt="profile"
                                 className={n.profileLogin}/>
                            <div className={notifications.length > 0 ? n.notificationVar : ''}>
                                <h3>{notifications.length > 9 ? '9+' : notifications.length > 0 ? notifications.length : ''}</h3>
                            </div>
                        </div>
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
                                <p className={'menu-item__text menu-greetings'}>Здравствуйте {props.name}</p>
                                <p className={'menu-item__text menu-balance'}>Баланс: 0 <img src="/profile/currency.svg"
                                                                                             alt="currency"
                                                                                             className={n.currency}/>E$
                                </p>
                                <DropdownItem
                                    auth='/chats'
                                >
                                    Чаты
                                    <div className={notifications.length > 0 ? n.notificationVarInDropdownItem : ''}>
                                        <h3>{notifications.length > 9 ? '9+' : notifications.length > 0 ? notifications.length : ''}</h3>
                                    </div>
                                </DropdownItem>
                                <DropdownItem
                                    auth='/sessions'
                                >
                                    Сессии
                                </DropdownItem>
                                <DropdownItem
                                    auth='/profile'
                                >
                                    Профиль
                                </DropdownItem>
                                <DropdownItem
                                    auth='/settings'
                                >
                                    Настройки
                                </DropdownItem>
                            </div>
                        </CSSTransition>
                    }

                </div>}
        </div>

    );
}

const Nav = (props) => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const isModelsPage = location.pathname === '/models';
    // const isSettingsPage = location.pathname === '/settings';
    let profileButtonStyle;
    let nav;
    if (isModelsPage) {
        profileButtonStyle = 'profileBlack'
    } else {
        profileButtonStyle = 'profile';
    }
    if (isHomePage) {
        nav = 'nav'
    } else {
        nav = 'navBlack'
    }

    return (
        <div>
            {/*<Menu customBurgerIcon={<img src="/BurgerButton.svg" alt={'burger icon'}/>}/>*/}
            <div className={`${nav}`}>
                <div>
                    <ul>
                        <li><NavLink to="/models" className={isModelsPage ? `${n.navItem} ${n.active}` : n.navItem}>Выбрать
                            пару</NavLink></li>
                        <li><NavLink to="#" className={n.navItem}>Подписки</NavLink></li>
                        <li><NavLink to='/' className={n.logo}>Afterlife</NavLink></li>
                        <li><NavLink to="#" className={n.navItem}>О нас</NavLink></li>
                        <li><NavLink to="#" className={n.navItem}>FAQs</NavLink></li>
                        {props.user ? <li className={n.rightSide}>
                            <NavItem icon={`${process.env.REACT_APP_API_URL}/${props.user.photo}`} isLoggedIn={true}
                                     isActivated={props.user.isActivated} name={props.user?.name}></NavItem>
                        </li> : props.oauthUser ? <li className={n.rightSide}>
                            <NavItem icon={`${process.env.REACT_APP_API_URL}/${props.oauthUser.user.photo}`}
                                     isLoggedIn={true}
                                     isActivated={true} name={props.user?.name}></NavItem>
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