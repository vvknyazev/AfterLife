import React from 'react';
import {slide as Menu} from 'react-burger-menu'
import n from './Nav.module.css'

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
                    <a href="#"><img src="/profile.svg" alt="profile" className={n.profile}/></a>
                </div>

            </div>

        </div>
    );
};

export default Nav;