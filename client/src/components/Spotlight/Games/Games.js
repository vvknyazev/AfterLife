import React from 'react';
import s from "../../../pages/Profile.module.css";

const Games = () => {
    return (
        <div>
            <div className={s.categoryContent}>
                <div className={s.categoryContentItem}>

                    <img src="/profile/spotlight/games/dota2.png" alt="game1"/>
                    <div>
                        <h4>Dota 2</h4>
                    </div>
                </div>
                <div className={s.categoryContentItem}>
                    <img src="/profile/spotlight/games/aoe.png" alt="game2"/>
                    <div>
                        <h4>AOE 4</h4>
                    </div>
                </div>
                <div className={s.categoryContentItem}>
                    <img src="/profile/spotlight/games/cs2.png" alt="game3"/>
                    <div>
                        <h4>CS 2</h4>
                    </div>
                </div>
                <div className={s.categoryContentItem}>
                    <img src="/profile/spotlight/games/genshin.png" alt="game4"/>
                    <div>
                        <h4>Genshin Impact</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Games;