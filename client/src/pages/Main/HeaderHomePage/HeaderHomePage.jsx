import React from 'react';
import s from './HeaderHomePage.module.css';
import {NavLink, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import ImageComponent from "../../../components/ImageComponent/ImageComponent";

const HeaderHomePage = () => {
    // const navigate = useNavigate()

    // function chooseCategory(category) {
    //     navigate('/models');
    // }
    const {t} = useTranslation()

    return (
        <div className={s.header}>
            <div className={s.back}>
                <ImageComponent
                    hash={'L6GHVC=s03=_-,IW9dI=01tQ}?IW'}
                    width={'100%'}
                    height={'calc(100vh - 5.5vw)'}
                    //     height={'100%'}
                    src="/home/background.jpg"
                    alt="back"
                />
            </div>
            <div className={s.content}>
                <div className={s.headerContent}>
                    <h2 className={s.headMessage}>{t('home.header')}</h2>
                    <p className={s.underHeadMessage}>
                        {t('home.underheader')}
                    </p>
                    <NavLink to={'/'} className={s.playButton}><img src="/home/play.svg"
                                                                    alt="play"/>{t('home.find_someone')}</NavLink>
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
