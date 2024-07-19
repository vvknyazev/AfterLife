import React from 'react';
import s from './HeaderHomePage.module.css';
import {NavLink, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const HeaderHomePage = () => {
    // const navigate = useNavigate()

    // function chooseCategory(category) {
    //     navigate('/models');
    // }
    const { t } = useTranslation()

    return (
        <div className={s.header}>
            <div className={s.content}>
                <div className={s.headerContent}>
                    <h2 className={s.headMessage}>{t('home.header')}</h2>
                    <p className={s.underHeadMessage}>
                        {t('home.underheader')}
                    </p>
                    <NavLink to={'/'} className={s.playButton}><img src="/home/play.svg" alt="play"/>{t('home.find_someone')}</NavLink>
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
