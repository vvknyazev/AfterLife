import React from 'react';
import s from './ConceptHomePage.module.css'
import TypeOfSessions from "../../../components/TypeOfSessions/TypeOfSessions";

const ConceptHomePage = () => {
    return (
        <div className={s.container}>
            <h1>Типы Сессий</h1>
            <TypeOfSessions/>
            <div className={s.session}>
                <img src="/JustTheTwoOfUs.png" alt="TwoOfUs"/>
            </div>
            {/*<div className={s.concept}>*/}
            {/*    <div className={s.defaultService}>*/}
            {/*        <div>*/}
            {/*            <img src="/two_of_us.png" alt="pic"/>*/}
            {/*        </div>*/}
            {/*        <div><img src="/double_joint.png" alt="pic"/></div>*/}
            {/*        <div><img src="/not_alone.png" alt="pic"/></div>*/}
            {/*    </div>*/}
            {/*    <div className={s.streamService}>*/}
            {/*        <img src="/Welcome_to_AfterLife.png" alt="stream-service"/>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
};

export default ConceptHomePage;