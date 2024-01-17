import React from 'react';
import s from "../../../pages/SessionBuilder/SessionBuilder.module.css";

const SessionGames = ({games, handleGame, selectedGame}) => {
    return (
        games.map((el, index) =>
            <div className={el.name === selectedGame ? `${s.gameItem} ${s.activeGame}` : `${s.gameItem}`}
                 key={index}
                 onClick={() => handleGame(el.name)}
            >
                <img src={el.img} alt={`${index}`}/>
                <p>{el.name}</p>
            </div>
        )
    );
};

export default SessionGames;