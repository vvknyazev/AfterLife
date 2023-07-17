import React from 'react';
import s from './Card.module.css'

const Card = (props) => {
    const dota = "/gameIcons/dota2-icon.svg";
    const csgo = "/gameIcons/csgo-icon.ico";
    const valorant = "/gameIcons/valorant.svg"
    const lol = "/gameIcons/LoL.ico";
    const pubg = "/gameIcons/pubg.svg";
    const apex = "/gameIcons/apex-legends.ico";
    const fortnite = "/gameIcons/fortnite.svg";

    let gameIcons = [];
    for (let game of props.games) {
        switch (game) {
            case "CS:GO":
                gameIcons.push(<img src={csgo} alt="csgo"/>)
                break;
            case "Dota 2":
                gameIcons.push(<img src={dota} alt="dota"/>)
                break;
            case "LOL":
                gameIcons.push(<img src={lol} alt="lol"/>)
                break;
            case "Valorant":
                gameIcons.push(<img src={valorant} alt="valorant"/>)
                break;
            case "Apex":
                gameIcons.push(<img src={apex} alt="apex"/>)
                break;
            case "Fortnite":
                gameIcons.push(<img src={fortnite} alt="fortnite"/>)
                break;
            case "PUBG":
                gameIcons.push(<img src={pubg} alt="pubg"/>)
                break;
        }
    }

    return (
        <div className={s.card}>
            <div>
                <img src={props.img} alt="girl" className={s.cardImg}/>
                <div className={s.section}>
                    {gameIcons}
                </div>
            </div>
            <p className={s.name}>{props.name}</p>
            <p className={s.desc}>{props.desc}</p>
        </div>
    );
};

export default Card;