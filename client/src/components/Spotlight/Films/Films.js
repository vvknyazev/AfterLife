import React from 'react';
import s from "../../../pages/Profile.module.css";

const Films = () => {
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
                <div className={s.categoryContentItem}>
                    <img src="/profile/spotlight/movies/film4.jpg" alt="film4"/>
                    <div>
                        <p>Стефен Карри: Недооцененный</p>
                        <h4>Stephen Curry: Underrated</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Films;