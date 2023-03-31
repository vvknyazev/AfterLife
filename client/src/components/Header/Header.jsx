import React from 'react';
import s from './Header.module.css';
import Caregories from "./Categories/Caregories";

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
                    <div className={`${s.card} + ${s.firstCard}`}>
                        <div>
                            <img src={'/girls/6.png'} alt="girl" className={s.cardImg}/>
                            <div className={s.section}>
                                <img src={'/gameIcons/apex-legends.svg'} alt="game"/>
                                <img src={'/gameIcons/pubg.svg'} alt="game"/>
                            </div>
                        </div>
                        <p className={s.name}>{'Ксения🦋'}</p>
                        <p className={s.desc}>{'“Какая-то очень интересная фраза”'}</p>
                    </div>
                    <div className={`${s.card} + ${s.secondCard}`}>
                        <div>
                            <img src={'/girls/7.png'} alt="girl" className={s.cardImg}/>
                            <div className={s.section}>
                                <img src={'/gameIcons/LoL.svg'} alt="game"/>
                                <img src={'/gameIcons/csgo-icon.ico'} alt="game"/>
                                <img src={'/gameIcons/fortnite.svg'} alt="game"/>
                            </div>
                        </div>
                        <p className={s.name}>{'Влада'}</p>
                        <p className={s.desc}>{'Доступна 24/7…….'}</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Header;