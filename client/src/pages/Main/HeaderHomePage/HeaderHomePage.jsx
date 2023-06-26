import React from 'react';
import s from './HeaderHomePage.module.css';
import Categories from "../../../components/Categories/Categories";
import {useGetUserQuery} from "../../../features/auth/authApiSlice";
import {InfinitySpin} from "react-loader-spinner";
import {useNavigate} from "react-router-dom";

const HeaderHomePage = () => {
    const navigate = useNavigate()

    function chooseCategory(category) {
        navigate('/models');
    }

    return (
        <div className={s.header}>
            <Categories chooseCategory={chooseCategory}/>
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
                            <img src={'/girls/6.jpeg'} alt="girl" className={s.cardImg}/>
                            <div className={s.section}>
                                <img src={'/gameIcons/apex-legends.ico'} alt="game"/>
                                <img src={'/gameIcons/pubg.svg'} alt="game"/>
                            </div>
                        </div>
                        <p className={s.name}>{'Ксения🦋'}</p>
                        <p className={s.desc}>{'“Какая-то очень интересная фраза”'}</p>
                    </div>
                    <div className={`${s.card} + ${s.secondCard}`}>
                        <div>
                            <img src={'/girls/7.jpeg'} alt="girl" className={s.cardImg}/>
                            <div className={s.section}>
                                <img src={'/gameIcons/LoL.ico'} alt="game"/>
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

export default HeaderHomePage;