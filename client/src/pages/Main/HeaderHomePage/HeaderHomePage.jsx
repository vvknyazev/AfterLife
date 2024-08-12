import React, {useEffect, useState} from 'react';
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

    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 1000);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className={s.header}>
            <div className={s.back}>
                <ImageComponent
                    hash={'L6GHVC=s03=_-,IW9dI=01tQ}?IW'}
                    width={'100%'}
                    height={'calc(100vh - 5.5vw)'}
                    //     height={'100%'}
                    src={isSmallScreen ? "/home/background-mobile.jpg" : "/home/background.jpg"}
                    alt="back"
                />
            </div>
            <div className={s.content}>
                <div className={s.headerContent}>
                    <h2 className={s.headMessage}>{t('home.header')}</h2>
                    <p className={s.underHeadMessage}>
                        {t('home.underheader')}
                    </p>
                    <NavLink to={'/hosts'} className={s.playButton}>{t('home.find_someone')}</NavLink>
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
