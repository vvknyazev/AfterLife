import React, {useEffect, useRef, useState} from 'react';
import {slide as Menu} from 'react-burger-menu'
import {ReactComponent as CaretIcon} from '../../icons/profile.svg';
import {ReactComponent as SignUpIcon} from '../../icons/signup.svg';
import {ReactComponent as LoginIcon} from '../../icons/login.svg';
import n from './Nav.module.css'
import {CSSTransition} from 'react-transition-group';

function NavItem(props) {
    const [open, setOpen] = useState(false);
    const [isFistTimeOpen, setIsFistTimeOpen] = useState(false);

    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);

    // useOnClickOutside(dropdownRef, () => setOpen(false));

     useEffect(() => {
         function handleClickOutside(event) {
             console.log(dropdownRef.current.contains(event.target));
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
            <a href="#" className="menu-item">
                <span className="icon-button">{props.leftIcon}</span>
                {props.children}
            </a>
        );
    }
    function toggleFirstTimeOpenVar(){
        setIsFistTimeOpen(false);
    }
    return (
        <div>
            {!isFistTimeOpen &&
                <a href="javascript://" className={n.profile} onClick={() => setOpen(!open)}>
                    {props.icon}
                </a>
            }
            {isFistTimeOpen &&
                <a href="javascript://" className={n.profile} onClick={() => {
                    toggleFirstTimeOpenVar();
                    setOpen(true)
                }
                }>
                    {props.icon}
                </a>
            }



            {open &&
                <div className="dropdown" style={{height: menuHeight}} ref={dropdownRef}>

                    <CSSTransition
                        in={activeMenu === 'main'}
                        timeout={500}
                        classNames="menu-primary"
                        unmountOnExit
                        onEnter={calcHeight}>
                        <div className="menu">
                            <DropdownItem
                                leftIcon={<SignUpIcon/>}
                            >
                                Sign Up
                            </DropdownItem>
                            <DropdownItem
                                leftIcon={<LoginIcon/>}
                            >
                                Log In
                            </DropdownItem>
                        </div>
                    </CSSTransition>
                </div>}
        </div>

    );
}

const Nav = () => {
    return (
        <div>
            <Menu customBurgerIcon={<img src="/BurgerButton.svg" alt={'burger icon'}/>}/>
            <div className={n.nav}>
                <div>
                    <a href="#"><img src="/Afterlife-logo.svg" alt="logo" className={n.logo}/></a>
                    <ul>
                        <li><a href="#">Выбрать пару</a></li>
                        <li><a href="#">Подписки</a></li>
                        <li><a href="#">О нас</a></li>
                        <li><a href="#">FAQs</a></li>
                    </ul>
                    <a href="#"><img src="/lang.svg" alt="lang" className={n.lang}/></a>
                    {/*<a href="#"><img src="/profile.svg" alt="profile" className={n.profile}/></a>*/}
                    <NavItem icon={<CaretIcon/>}/>
                </div>

            </div>

        </div>
    );
};

export default Nav;