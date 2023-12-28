import React from 'react';
import s from './SessionType.module.css'
const SessionType = ({name, className}) => {
    return (
        <div className={`${s.sessionType} ${className}`}>
            <p>{name}</p>
        </div>
    );
};

export default SessionType;