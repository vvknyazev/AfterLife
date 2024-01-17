import React from 'react';
import s from './SessionTimeItem.module.css'
const SessionTimeItem = ({sessionPrice, isActive, onClick}) => {

    const { time, price } = sessionPrice;

    return (
        <div
            className={`${s.option} ${isActive ? s.active : ''}`}
            onClick={onClick}
        >
            <div className={s.time}>
                <p>{time}</p>
            </div>
            <div className={s.amount}>
                <img src="/profile/currency.svg" alt="currency" />
                <p>{price}</p>
            </div>
        </div>
    );
};

export default SessionTimeItem;