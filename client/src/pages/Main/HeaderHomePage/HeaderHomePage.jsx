import React from 'react';
import s from './HeaderHomePage.module.css';
import {NavLink, useNavigate} from "react-router-dom";

const HeaderHomePage = () => {
    // const navigate = useNavigate()

    // function chooseCategory(category) {
    //     navigate('/models');
    // }

    return (
        <div className={s.header}>
            <div className={s.content}>
                <div className={s.headerContent}>
                    <h2 className={s.headMessage}>Найди своего<br/>идеального «Player 2»</h2>
                    <p className={s.underHeadMessage}>
                        Платформа использующая AI для того, чтобы найти напарника для различных активностей
                    </p>
                    <NavLink to={'/'} className={s.playButton}><img src="/home/play.svg" alt="play"/>Найти пару</NavLink>
                </div>
                <div>
                    <img src="/home/percent.svg" alt="perc1" className={s.left}/>
                    <img src="/home/percent.svg" alt="perc2" className={s.right}/>
                </div>
            </div>

        </div>
    );
};

export default HeaderHomePage;
