import React from 'react';
import s from "../../../pages/Profile.module.css";

const Music = () => {
    return (
        <div>
            <div className={s.categoryContent}>
                <div className={s.categoryContentItem}>

                    <img src="/profile/spotlight/music/music1.jpg" alt="music1"/>
                    <div>
                        <p>Måneskin</p>
                        <h4>HONEY (ARE U COMING?)</h4>
                    </div>
                </div>
                <div className={s.categoryContentItem}>
                    <img src="/profile/spotlight/music/music2.jpg" alt="music2"/>
                    <div>
                        <p>Ethan Bortnick</p>
                        <h4>engravings</h4>
                    </div>
                </div>
                <div className={s.categoryContentItem}>
                    <img src="/profile/spotlight/music/music3.webp" alt="music3"/>
                    <div>
                        <p>TK from Ling tosite sigure</p>
                        <h4>first death</h4>
                    </div>
                </div>
                <div className={s.categoryContentItem}>
                    <img src="/profile/spotlight/music/music4.webp" alt="music4"/>
                    <div>
                        <p>XXXTENTACION</p>
                        <h4>Everybody Dies In Their Nightmares</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Music;