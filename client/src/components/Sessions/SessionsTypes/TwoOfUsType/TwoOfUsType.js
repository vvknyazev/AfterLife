import React, {useEffect, useState} from 'react';
import s from './TwoOfUs.module.css';

const TwoOfUsType = ({user, model}) => {

    const [userPhoto, setUserPhoto] = useState('/nav/user-photo.jpeg');

    useEffect(() => {
        if (user) {
            if (user?.photo !== userPhoto) {
                setUserPhoto(`${process.env.REACT_APP_API_URL}/${user?.photo}`);
            }
        }
    }, [])

    return (
        <div className={s.container}>
            <div className={s.blockItem}>
                <img src={userPhoto} alt="user-photo"/>
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