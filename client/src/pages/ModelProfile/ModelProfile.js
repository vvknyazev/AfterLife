import React from 'react';
import Nav from "../../components/Nav/Nav";
import s from "./ModelProfile.module.css";
import {useOutletContext, useParams} from "react-router-dom";
import {useGetOneModelQuery} from "../../features/commonApiSlice";
import {InfinitySpin} from "react-loader-spinner";

const ModelProfile = () => {

    const [user, oauthUser] = useOutletContext();
    const {modelId} = useParams();

    const {data: model, isLoading} = useGetOneModelQuery(modelId);

    if (isLoading) {
        return <div className={'loader'}>
            <InfinitySpin
                width='200'
                color="#000"
            />
        </div>;
    }

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