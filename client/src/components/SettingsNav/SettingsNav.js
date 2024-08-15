import React from 'react';
import s from './SettingsNav.module.css'
import {NavLink, useLocation} from "react-router-dom";
const SettingsNav = () => {

    const location = useLocation();

    const isSettingsProfilePage = location.pathname === '/settings/profile';
    const isSettingsActivityPage = location.pathname === '/settings/activity';
    const isSettingsBalancePage = location.pathname === '/settings/balance';
    const isSettingsFriendsPage = location.pathname === '/settings/friends';
    const isSettingsAchievementsPage = location.pathname === '/settings/achievements';

    return (
        <div className={s.navBlock}>
            <div className={isSettingsProfilePage ? `${s.navItem} ${s.active}` : s.navItem}>
                <NavLink to={'/settings/profile'}>Профиль</NavLink>
            </div>
            <div className={isSettingsActivityPage ? `${s.navItem} ${s.active}` : s.navItem}>
                <NavLink to={'/settings/activity'}>Активности</NavLink>
            </div>
            <div className={isSettingsBalancePage ? `${s.navItem} ${s.active}` : s.navItem}>
                <NavLink to={'/settings/balance'}>Баланс</NavLink>
            </div>
            <div className={isSettingsFriendsPage ? `${s.navItem} ${s.active}` : s.navItem}>
                <NavLink to={'/settings/friends'}>Друзья</NavLink>
            </div>
            <div className={isSettingsAchievementsPage ? `${s.navItem} ${s.active}` : s.navItem}>
                <NavLink to={'/settings/achievements'}>Достижения</NavLink>
            </div>
        </div>
    );
};

export default SettingsNav;
