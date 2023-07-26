import React, {useEffect, useRef, useState} from 'react';
import Nav from "../../components/Nav/Nav";
import s from "./ModelProfile.module.css";
import {NavLink, useLocation, useNavigate, useOutletContext, useParams} from "react-router-dom";
import {useGetOneModelQuery} from "../../features/commonApiSlice";
import {InfinitySpin} from "react-loader-spinner";
import io from 'socket.io-client';
import {useDispatch} from "react-redux";

const ModelProfile = () => {

    const [user, oauthUser] = useOutletContext();
    const {modelId} = useParams();
    const navigate = useNavigate();
    const location = useLocation();


    const {data: model, isLoading} = useGetOneModelQuery(modelId);

    if (isLoading) {
        return <div className={'loader'}>
            <InfinitySpin
                width='200'
                color="#000"
            />
        </div>;
    }

    const addUser = () => {
        if (user || oauthUser) {
            navigate('/chats', {
                state: {
                    from: location
                }
            });
        } else{
            navigate('/login');
        }
    };

    return (
        <div>
            <Nav user={user} oauthUser={oauthUser}/>
            <section className={s.profile}>

                <div className={s.header}>
                    <div className={s.mask}>
                        <div className={s.profileContainer}>
                            <div className={s.profileInfo}>
                                <div className={s.profilePhoto}>
                                    <img src={model.photo} alt="profile-photo"/>
                                </div>
                                <div className={s.description}>
                                    <p className={s.name}>{model.name}</p>
                                    <p className={s.bio}>{model.bio}</p>
                                    <p className={s.lang}>Ukrainian &nbsp; · &nbsp; English &nbsp; ·
                                        Russian &nbsp; ·  &nbsp; <span>HQ</span></p>
                                </div>
                            </div>
                            <div className={s.edit}>
                                <button onClick={addUser} className={s.secondButton}>Написать</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={s.content}>

                </div>
            </section>
        </div>
    )
        ;
};

export default ModelProfile;