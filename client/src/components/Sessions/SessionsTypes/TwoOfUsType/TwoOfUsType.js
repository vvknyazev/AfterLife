import React from 'react';
import s from './TwoOfUs.module.css';

const TwoOfUsType = ({user, model}) => {

    return (
        <div className={s.container}>
            <div className={s.blockItem}>
                <img src={user?.photo.includes('http') ? user?.photo : `${process.env.REACT_APP_API_URL}/${user?.photo}`} alt="user-photo"/>
                <p>{user?.username}</p>
            </div>
            <div className={s.connection}>
                <img src="/connection2.png" alt="connection"/>
            </div>
            <div className={s.blockItem}>
                <img src={`${process.env.REACT_APP_API_URL}/${model?.photo}`} alt="model-photo"/>
                <p>{model?.name}</p>
            </div>
        </div>
    );
};

export default TwoOfUsType;