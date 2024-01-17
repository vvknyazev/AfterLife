import React, {useEffect, useState} from 'react';
import s from './NotAloneType.module.css'

const NotAloneType = ({user, model, openModal}) => {

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
            <div className={s.column}>
                <div className={s.blockItem}>
                    <img src={`${process.env.REACT_APP_API_URL}/${model?.photo}`} alt="model-photo"/>
                </div>
                <div className={s.blockItem}>
                    <img src='/add-user.svg' alt="add-user" onClick={openModal}/>
                </div>
            </div>
            <div className={s.connection}>
                <img src="/left-connection.png" alt="connection"/>
            </div>

            <div className={s.userPhotoBlock}>
                <img src={userPhoto} alt="user-photo"/>
            </div>
            <div className={s.connection}>
                <img src="/right-connection.png" alt="connection"/>
            </div>
            <div className={s.column}>
                <div className={s.blockItem}>
                    <img src='/add-user.svg' alt="add-user" onClick={openModal}/>
                </div>
                <div className={s.blockItem}>
                    <img src='/add-user.svg' alt="add-user" onClick={openModal}/>
                </div>
            </div>
        </div>
    );
};

export default NotAloneType;