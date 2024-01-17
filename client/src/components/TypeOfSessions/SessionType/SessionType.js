import React from 'react';
import s from './SessionType.module.css'
const SessionType = ({ name, className, onClick }) => {
    return (
        <div className={`${s.sessionType} ${className}`} onClick={onClick}>
            <p>{name}</p>
        </div>
    );
};
export default SessionType;