import React, {useEffect, useRef, useState} from 'react';
import {slide as Menu} from 'react-burger-menu'
import {ReactComponent as CaretIcon} from '../../icons/profile.svg';
import {ReactComponent as SignUpIcon} from '../../icons/signup.svg';
import {ReactComponent as LoginIcon} from '../../icons/login.svg';
import n from './Nav.module.css'
import {CSSTransition} from 'react-transition-group';
import {NavLink} from "react-router-dom";
import {useGetUserQuery} from "../../features/auth/authApiSlice";
import {InfinitySpin} from "react-loader-spinner";

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
                    {props.icon}
                </a>
            }
            {isFistTimeOpen &&
                <a href={undefined} className={n.profile} onClick={() => {
                    toggleFirstTimeOpenVar();
                    setOpen(true)
                }
                }>
                    {props.icon}
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
                                </div>
                            </CSSTransition>
                    }

                </div>}
        </div>

    );
}

const Nav = (props) => {
    // console.log('ISLOGGED IN IN NAV', props.isLoggedIn);
    return (
        <div>
            <Menu customBurgerIcon={<img src="/BurgerButton.svg" alt={'burger icon'}/>}/>
            <div className={n.nav}>
                <div>
                    <NavLink to='/' className={n.logo}>Afterlife</NavLink>
                    <ul>
                        <li><NavLink to="#">Выбрать пару</NavLink></li>
                        <li><NavLink to="#">Подписки</NavLink></li>
                        <li><NavLink to="#">О нас</NavLink></li>
                        <li><NavLink to="#">FAQs</NavLink></li>
                    </ul>
                    <a href="#"><img src="/lang.svg" alt="lang" className={n.lang}/></a>
                    {/*<a href="#"><img src="/profile.svg" alt="profile" className={n.profile}/></a>*/}
                    <NavItem icon={<CaretIcon/>} isLoggedIn={props.isLoggedIn} isActivated={props.isActivated}/>
                </div>

            </div>

        </div>
    );
};

export default Nav;