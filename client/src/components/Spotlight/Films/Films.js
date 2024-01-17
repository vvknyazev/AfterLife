import React from 'react';
import s from "../../../pages/Profile.module.css";

const Films = ({sessionBuilder}) => {
    return (
        <div>
            <div className={s.categoryContent}>
                <div className={s.categoryContentItem}>

                    <img src="/profile/spotlight/movies/film1.jpg" alt="film1"/>
                    <div>
                        <p>ЛУНА</p>
                        <h4>Deo mun / The Moon</h4>
                    </div>
                </div>
                <div className={s.categoryContentItem}>
                    <img src="/profile/spotlight/movies/film2.jpg" alt="film2"/>
                    <div>
                        <p>Человек-паук: Лотос</p>
                        <h4>Spider-Man: Lotus</h4>
                    </div>
                </div>
                <div className={s.categoryContentItem}>
                    <img src="/profile/spotlight/movies/film3.jpg" alt="film3"/>
                    <div>
                        <p>Китайский пинг-понг</p>
                        <h4>Zhong Guo ping pang zhi jue di fan ji / Ping Pong: The
                            Triumph</h4>
                    </div>
                </div>
                {sessionBuilder
                    ?
                    <div className={`${s.categoryContentItem}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                            <path d="M24 12V36M36 24H12" stroke="white" strokeOpacity="0.84" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    :
                    <div className={s.categoryContentItem}>
                        <img src="/profile/spotlight/movies/film4.jpg" alt="film4"/>
                        <div>
                            <p>Стефен Карри: Недооцененный</p>
                            <h4>Stephen Curry: Underrated</h4>
                        </div>
                    </div>
                }

            </div>
        </div>
    );
};

export default Films;