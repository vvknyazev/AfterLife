import React from 'react';
import s from './Card.module.css'
import {useNavigate} from "react-router-dom";

const Card = (props) => {
    const dota = "/gameIcons/dota2-icon.svg";
    const csgo = "/gameIcons/csgo.svg";
    const valorant = "/gameIcons/valorant.svg"
    const lol = "/gameIcons/lol.svg";
    const pubg = "/gameIcons/pubg.svg";
    const overwatch = "/gameIcons/overwatch.svg";
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
            case "Overwatch":
                gameIcons.push(<img src={overwatch} alt="overwatch"/>)
                break;
            case "Fortnite":
                gameIcons.push(<img src={fortnite} alt="fortnite"/>)
                break;
            case "PUBG":
                gameIcons.push(<img src={pubg} alt="pubg"/>)
                break;
        }
    }

    const navigate = useNavigate();
    function handleModelProfile(id){
        navigate('/' + id);
    }
    console.log('props id:', props.id);
    return (
        <div className={s.card} onClick={() => handleModelProfile(props.id)}>
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