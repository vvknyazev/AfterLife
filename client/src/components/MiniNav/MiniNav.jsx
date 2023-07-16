import React from 'react';
import s from './MiniNav.module.css'
import {NavLink, useLocation} from "react-router-dom";

const MiniNav = () => {

    const location = useLocation();
    const isChatsPage = location.pathname === '/chats';
    const isSessionsPage = location.pathname === '/sessions';
    const isProfilePage = location.pathname === '/profile';
    const isSettingsPage = location.pathname === '/settings';

    return (
        <div className={s.layer}>
            <div className={isChatsPage ? s.active : ''}>
                <NavLink to={'/chats'} className={s.link}>Чаты</NavLink>
            </div>
            <div className={isSessionsPage ? s.active : ''}>
                <NavLink to={'/sessions'} className={s.link}>Сессии</NavLink>
            </div>
            <div className={isProfilePage ? s.active : ''}>
                <NavLink to={'/profile'} className={s.link}>Профиль</NavLink>
            </div>
            <div className={isSettingsPage ? s.active : ''}>
                <NavLink to={'/settings'} className={s.link}>Настройки</NavLink>
            </div>
        </div>
    );
};

export default MiniNav;