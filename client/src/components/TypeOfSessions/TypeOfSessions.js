import React from 'react';
import s from './TypeOfSessions.module.css'
import SessionType from "./SessionType/SessionType";
const TypeOfSessions = ({ sessionNames, selectedSession, onSelectSession }) => {
    return (
        <div className={s.sessions}>
            {sessionNames.map((name, index) => (
                <SessionType
                    key={index}
                    name={name}
                    className={name === selectedSession ? s.active : ''}
                    onClick={() => onSelectSession(name)}
                />
            ))}
        </div>
    );
};



export default TypeOfSessions;