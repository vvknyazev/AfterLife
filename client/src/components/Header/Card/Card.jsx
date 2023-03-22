import React from 'react';
import s from './Card.module.css'

const Card = (props) => {
    return (
        <div className={s.card}>
            <img src={props.img} alt="girl" className={s.cardImg}/>
            <p className={s.name}>{props.name}</p>
            <p className={s.desc}>{props.desc}</p>
        </div>
    );
};

export default Card;