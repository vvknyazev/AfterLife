import React from 'react';
import s from './FooterHomePage.module.css'

const FooterHomePage = () => {
    return (
        <div className={s.footer}>
            <div className={s.about}>
                <p>Об Afterlife</p>
                <a href={'#'}>Компания</a>
                <a href={'#'}>Вакансии</a>
            </div>
            <div className={s.more}>
                <p>Узнать больше</p>
                <a href={'#'}>FAQ</a>
                <a href={'#'}>Оферта</a>
                <a href={'#'}>Персональные данные</a>
            </div>
            <div className={s.support}>
                <p>Поддержка</p>
                <a href={'#'}>Центр поддержки</a>
            </div>
            <div className={s.social}>
                <p>Сети</p>
                <div className={s.socialIco}>
                    <a href="#" className={s.ico1}><img src="/social-ico/telegram.svg" alt="telegram"/></a>
                    <a href="#" className={s.ico2}><img src="/social-ico/tik-tok.svg" alt="tik-tok"/></a>
                    <a href="#" className={s.ico3}><img src="/social-ico/instagram.svg" alt="instagram"/></a>
                </div>
            </div>
            <div className={s.payment}>
                <img src="/social-ico/visa.svg" alt="visa"/>
                <img src="/social-ico/mastercard.svg" alt="mastercard"/>
            </div>
            <div>
                {/*<img src="/social-ico/" alt="lang"/>*/}
            </div>
        </div>
    );
};

export default FooterHomePage;