import React from 'react';
import style from './Header.module.css';
import Caregories from "./Categories/Caregories";

const Header = () => {
    return (
            <div className={style.header}>
                <Caregories/>
            </div>
    );
};

export default Header;