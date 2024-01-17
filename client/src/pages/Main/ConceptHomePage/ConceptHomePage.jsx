import React, {useState} from 'react';
import s from './ConceptHomePage.module.css'
import TypeOfSessions from "../../../components/TypeOfSessions/TypeOfSessions";
import TwoOfUsType from "../../../components/Sessions/SessionsTypes/TwoOfUsType/TwoOfUsType";
import DoubleJointType from "../../../components/Sessions/SessionsTypes/DoubleJointType/DoubleJointType";
import NotAloneType from "../../../components/Sessions/SessionsTypes/NotAloneType/NotAloneType";

const ConceptHomePage = ({user, model}) => {

    const [selectedSession, setSelectedSession] = useState('Just The Two of Us');

    const sessionNames = ['Just The Two of Us', 'Double Double joint', 'You are (not) alone'];
    return (
        <div className={s.container}>
            <h1>Типы Сессий</h1>
            <TypeOfSessions
                sessionNames={sessionNames}
                selectedSession={selectedSession}
                onSelectSession={(session) => setSelectedSession(session)}
            />
            <div className={s.session}>
                {selectedSession === 'Just The Two of Us' && <TwoOfUsType user={user} model={model} />}
                {selectedSession === 'Double Double joint' && <DoubleJointType user={user} model={model} />}
                {selectedSession === 'You are (not) alone' && <NotAloneType />}
            </div>
        </div>
    );
};

export default ConceptHomePage;