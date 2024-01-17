import React, {useEffect, useState} from 'react';
import s from './DoubleJointType.module.css'

const DoubleJointType = ({user, model, openModal}) => {
    const [userPhoto, setUserPhoto] = useState('/nav/user-photo.jpeg');

    useEffect(() => {
        if (user) {
            if (user?.photo !== userPhoto) {
                setUserPhoto(`${process.env.REACT_APP_API_URL}/${user?.photo}`);
            }
        }
    }, [])


    return (
        <div>
            <div className={s.container}>
                <div className={s.blockItem}>
                    <div className={s.blockImages}>
                        <img src={userPhoto} alt="user-photo"/>
                        <img src='/add-user.svg' alt="add-user" className={s.secondImage} onClick={openModal}/>
                    </div>
                    <div>
                        <p>{user?.username}</p>
                        <p>&</p>
                        <p>USER NICKNAME</p>
                    </div>
                </div>
                <div className={s.connection}>
                    <img src="/double-connection.png" alt="double-connection"/>
                </div>
                <div className={s.blockItem}>
                    <div className={s.blockImages}>
                        <img src={`${process.env.REACT_APP_API_URL}/${model?.photo}`} alt="model-photo"/>
                        <img src='/add-user.svg' alt="add-user" className={s.secondImage} onClick={openModal}/>
                    </div>
                    <div>
                        <p>{model?.name}</p>
                        <p>&</p>
                        <p>HOST NICKNAME</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoubleJointType;