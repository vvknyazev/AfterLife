import React, {useRef, useState} from 'react';
import {slide as Menu} from 'react-burger-menu'
import {ReactComponent as CaretIcon} from '../../icons/profile.svg';
import {ReactComponent as SignUpIcon} from '../../icons/signup.svg';
import {ReactComponent as LoginIcon} from '../../icons/login.svg';
import n from './Nav.module.css'
import {CSSTransition} from 'react-transition-group';

function NavItem(props) {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <a href="#" className={n.profile} onClick={() => setOpen(!open)}>
                {props.icon}
            </a>

            {open && props.children}
        </div>
    );
}

function DropdownMenu() {
    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);


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

    return (
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
                    <NavItem icon={<CaretIcon/>}>
                        <DropdownMenu></DropdownMenu>
                    </NavItem>

                </div>

            </div>

        </div>
    );
};

export default Nav;