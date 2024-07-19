import React from 'react';
import s from './Card.module.css'
import {useNavigate} from "react-router-dom";

const Card = (props) => {
    // const dota = "/gameIcons/dota2-icon.svg";
    // const csgo = "/gameIcons/csgo.svg";
    // const valorant = "/gameIcons/valorant.svg"
    // const lol = "/gameIcons/lol.svg";
    // const pubg = "/gameIcons/pubg.svg";
    // const overwatch = "/gameIcons/overwatch.svg";
    // const fortnite = "/gameIcons/fortnite.svg";

    const dota = "/gameIcons/color/dota2.png";
    const csgo = "/gameIcons/color/cs2.png";
    const valorant = "/gameIcons/color/valorant.png"
    const lol = "/gameIcons/color/lol.png";
    const pubg = "/gameIcons/color/pubg.png";
    const overwatch = "/gameIcons/overwatch.svg";
    const fortnite = "/gameIcons/fortnite.svg";

    let gameIcons = [];
    for (let game of props.games) {
        if (gameIcons.length < 3) {
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
    }
    const navigate = useNavigate();

    function handleModelProfile(id) {
        navigate('/host/' + id);
    }

    return (
        <div className={s.card} onClick={() => handleModelProfile(props.id)}>
            <img src={props.img} alt="model" className={s.cardImg}/>
            <div className={s.top}>
                <div className={s.gameSection}>
                    {gameIcons}
                </div>
                <div className={s.sound}>
                    <img src="/home/sound.svg" alt="sound"/>
                </div>
            </div>
            <div className={s.bottom}>
                <p className={s.name}>{props.name}</p>
                <img className={s.verified} src="/home/verified.svg" alt="verified"/>
                <div className={s.matchPerc}>
                    <img src="/home/match.svg" alt="match"/>
                    <p className={s.percNumber}>87</p>
                </div>
            </div>
            {/*<div className={s.borderLeft}></div>*/}
            {/*<div className={s.borderRight}></div>*/}
            {/*<div>*/}
            {/*    <img src={props.img} alt="girl" className={s.cardImg}/>*/}
            {/*    <div className={s.mask}/>*/}
            {/*    <div className={s.nameSection}>*/}
            {/*        <div>*/}
            {/*            <p className={s.name}>{props.name}</p>*/}
            {/*        </div>*/}
            {/*        <div className={s.rating}>*/}
            {/*            <p>8.2</p>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className={s.section}>*/}
            {/*        {gameIcons}*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<p className={s.desc}>{props.desc}</p>*/}
        </div>
    );
};

export default Card;
