import React from 'react';
import s from "../../../pages/Profile.module.css";
import ImageComponent from "../../ImageComponent/ImageComponent";

const Films = ({sessionBuilder}) => {
    return (
        <div>
            <div className={s.categoryContent}>
                <div className={s.categoryContentItem}>
                    <ImageComponent hash={'L49@S5004nIA~qIU-;IoNGoLjFWV'} width={'3.333vw'} height={'4.42vw'}  src="/profile/spotlight/movies/film1.jpg" alt="film1"/>
                    <div>
                        <p>ЛУНА</p>
                        <h4>Deo mun / The Moon</h4>
                    </div>
                </div>
                <div className={s.categoryContentItem}>
                    <ImageComponent hash={'L2AJ.-_300b^vLX8PAt8009F8wVs'} width={'3.333vw'} height={'4.42vw'}  src="/profile/spotlight/movies/film2.jpg" alt="film2"/>
                    <div>
                        <p>Человек-паук: Лотос</p>
                        <h4>Spider-Man: Lotus</h4>
                    </div>
                </div>
                <div className={s.categoryContentItem}>
                    <ImageComponent hash={'LFFXn,s.D5aK~BoLrDo09abFXSS5'} width={'3.333vw'} height={'4.42vw'}  src="/profile/spotlight/movies/film3.jpg" alt="film3"/>
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
                        <ImageComponent hash={'LAOCAF.8~2rq?5r:adf5}#IVA2Xo'} width={'3.333vw'} height={'4.42vw'}  src="/profile/spotlight/movies/film4.jpg" alt="film4"/>
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
