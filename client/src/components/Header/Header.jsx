import React from 'react';
import s from './Header.module.css';
import Caregories from "./Categories/Caregories";
import Card from "./Card/Card";

const Header = () => {
    return (
        <div className={s.header}>
            <Caregories/>
            {/*<div><p className={s.title}>Мы поможем найти вам идеальную игровую пару</p></div>*/}
            <div className={s.content}>
                <div className={s.greetings}>
                    <h1>You will feel pleasure,
                        pain and fun <br/>
                        welcome to <span className={s.logo}>AfterLife</span></h1>

                </div>

                <div className={s.cardPosition}>
                    <Card img={'/girls/6.png'} name={'Ксения🦋'} desc={'“Какая-то очень интересная фраза”'} />
                    <Card img={'/girls/7.png'} name={'Влада'} desc={'Доступна 24/7…….'}/>
                </div>
            </div>

        </div>
    );
};

export default Header;