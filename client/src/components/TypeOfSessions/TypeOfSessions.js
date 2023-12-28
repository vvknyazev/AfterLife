import React from 'react';
import s from './TypeOfSessions.module.css'
import SessionType from "./SessionType/SessionType";
const TypeOfSessions = () => {
    const sessionNames = ['Just The Two of Us', 'Double Double joint', 'You are (not) alone'];

    return (
        <div className={s.sessions}>
            {sessionNames.map((name, index) => (
                <SessionType
                    key={index}
                    name={name}
                    className={index === 0 ? s.active : ''}
                />
            ))}
        </div>
    );
};



export default TypeOfSessions;