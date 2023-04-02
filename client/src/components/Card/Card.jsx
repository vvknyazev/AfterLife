import React from 'react';
import s from './Card.module.css'

const Card = (props) => {
    return (
        <div className={s.card}>
            <div>
                <img src={props.img} alt="girl" className={s.cardImg}/>
                <div className={s.section}>
                    {props.g1 && (
                        <img src={props.g1} alt="game"/>
                    )}
                    {props.g2 && (
                        <img src={props.g2} alt="game"/>
                    )}
                    {props.g3 && (
                        <img src={props.g3} alt="game"/>
                    )}
                    {props.g4 && (
                        <img src={props.g4} alt="game"/>
                    )}
                </div>
            </div>
            <p className={s.name}>{props.name}</p>
            <p className={s.desc}>{props.desc}</p>
        </div>
    );
};

export default Card;