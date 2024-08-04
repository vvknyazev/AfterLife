import React from 'react';
import {useNavigate} from "react-router-dom";
import s from './SearchItem.module.css'

const SearchItem = (props) => {

    const dota = "/gameIcons/color/dota2.png";
    const csgo = "/gameIcons/color/cs2.png";
    const valorant = "/gameIcons/color/valorant.png"
    const lol = "/gameIcons/color/lol.png";
    const pubg = "/gameIcons/color/pubg.png";
    const overwatch = "/gameIcons/overwatch.svg";
    const fortnite = "/gameIcons/fortnite.svg";

    let gameIcons = [];
    for (let game of props.games) {
        switch (game) {
            case "CS2":
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

    function handleModelProfile(id) {
        props.closeModal();
        navigate('/host/' + id);
    }

    return (
        <div className={s.card} onClick={() => handleModelProfile(props.id)}>
            <img src={props.img} alt="model" className={s.cardImg}/>
            <div className={s.names}>
                <p className={s.name}>{props.name}</p>
                <p className={s.tag}>@{props.username}</p>
            </div>
            <div className={s.top}>
                <div className={s.gameSection}>
                    {gameIcons}
                </div>
                <div className={s.matchPerc}>
                    <img src="/home/match.svg" alt="match"/>
                    <p className={s.percNumber}>87</p>
                </div>
            </div>

        </div>
    );
};

export default SearchItem;
