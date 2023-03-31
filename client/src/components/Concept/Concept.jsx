import React from 'react';
import s from './Concept.module.css'

const Concept = () => {
    return (
        <div className={s.container}>
            <h1>Концепция</h1>
            <div className={s.concept}>
                <div className={s.defaultService}>
                    <div>
                        <img src="/two_of_us.png" alt="pic"/>
                    </div>
                    <div><img src="/double_joint.png" alt="pic"/></div>
                    <div><img src="/not_alone.png" alt="pic"/></div>
                </div>
                <div className={s.streamService}>
                    <img src="/Welcome_to_AfterLife.png" alt="stream-service"/>
                </div>
            </div>
        </div>
    );
};

export default Concept;