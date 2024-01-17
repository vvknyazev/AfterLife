import React, {useState} from 'react';
import Nav from "../../components/Nav/Nav";
import s from "./ModelProfile.module.css";
import {NavLink, useLocation, useNavigate, useOutletContext, useParams} from "react-router-dom";
import {useAddContactMutation, useGetOneModelQuery} from "../../features/commonApiSlice";
import {InfinitySpin} from "react-loader-spinner";
import Player from "../../components/Player/Player";
import Films from "../../components/Spotlight/Films/Films";
import Games from "../../components/Spotlight/Games/Games";
import Music from "../../components/Spotlight/Music/Music";

const ModelProfile = () => {

    const [user, oauthUser] = useOutletContext();
    const {modelId} = useParams();
    const navigate = useNavigate();
    const location = useLocation();


    const {data: model, isLoading} = useGetOneModelQuery(modelId);

    const [addContact, {isLoading: isLoadingContactAdding}] = useAddContactMutation();

    const [activeCategory, setActiveCategory] = useState('Смотрю');

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
    };

    if (isLoading || isLoadingContactAdding) {
        return <div>
            <Nav user={user} oauthUser={user}/>
            <div className={'loader'}>
                <InfinitySpin
                    width='200'
                    color="#000"
                />
            </div>
        </div>;
    }

    const addUser = async () => {
        if (user) {
            await addContact({from: user.id, to: location.pathname?.substring(1)});
            navigate('/chats', {
                state: {
                    from: location
                }
            });
        } else if (oauthUser) {
            await addContact({from: oauthUser.user.id, to: location.pathname?.substring(1)});
            navigate('/chats', {
                state: {
                    from: location
                }
            });
        } else {
            navigate('/login');
        }
    };

    return (
        <div className={s.modelProfileBackground}>
            <Nav user={user} oauthUser={oauthUser}/>
            <section className={s.profile}>

                <div className={s.header}>
                    <div className={s.mask2}></div>
                    <div className={s.mask}>
                        <div className={s.profileContainer}>
                            <div className={s.profileContainer}>
                                <div className={s.profileInfo}>
                                    <div className={s.profilePhoto}>
                                        <img src={`${process.env.REACT_APP_API_URL}/${model?.photo}`}
                                             alt="profile-photo"/>
                                    </div>
                                    <div className={s.description}>
                                        <p className={s.name}>{model?.name}</p>
                                        <p className={s.bio}>{`@${model?.name}`}</p>
                                    </div>
                                    <div className={s.connectContainer}>
                                        <NavLink to={`/create-session/${modelId}`} className={s.connect}>Подключить</NavLink>
                                    </div>
                                </div>
                                {/*<div className={s.edit}>*/}
                                {/*    <button onClick={addUser} className={s.secondButton}>Написать</button>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>

                </div>
                <div className={s.content}>
                    <div className={s.shining2}></div>
                    <div className={s.descContainer}>
                        <div className={s.info}>
                            <div className={s.shining}></div>
                            <div className={s.shiningBackground}>
                                <div className={s.smallBio}>
                                    <div className={s.smallBioItem}>
                                        <h4>8.7</h4>
                                        <p>Рейтинг</p>
                                    </div>
                                    <div className={s.smallBioItem}>
                                        <h4>52</h4>
                                        <p>Сессии</p>
                                    </div>
                                    <div className={`${s.smallBioItem} ${s.achievements}`}>
                                        <div>
                                            <img src="/profile/achievements/1.png" alt="1"/>
                                            <img src="/profile/achievements/2.png" alt="2"/>
                                            <img src="/profile/achievements/3.png" alt="3"/>
                                        </div>
                                        <p>Достижения</p>
                                    </div>
                                </div>
                                <div className={s.infoBio}>
                                    <h3>Обо мне</h3>
                                    <p>{model?.bio}</p>
                                </div>
                                <div className={s.langBio}>
                                    <div className={s.langBioItem}><p>Русский</p></div>
                                    <div className={s.langBioItem}><p>Українська</p></div>
                                    <div className={s.langBioItem}><p>English</p></div>
                                </div>
                            </div>
                        </div>
                        <div className={s.spotlight}>
                            <div className={s.shiningBackground2}>
                                <h3>Spotlight</h3>
                                <div className={s.categories}>
                                    <div
                                        className={`${s.categoriesItem} ${activeCategory === 'Смотрю' ? s.active : ''}`}
                                        onClick={() => handleCategoryChange('Смотрю')}
                                    >
                                        <p>Смотрю</p>
                                    </div>
                                    <div
                                        className={`${s.categoriesItem} ${activeCategory === 'Играю' ? s.active : ''}`}
                                        onClick={() => handleCategoryChange('Играю')}
                                    >
                                        <p>Играю</p>
                                    </div>
                                    <div
                                        className={`${s.categoriesItem} ${activeCategory === 'Слушаю' ? s.active : ''}`}
                                        onClick={() => handleCategoryChange('Слушаю')}
                                    >
                                        <p>Слушаю</p>
                                    </div>
                                </div>

                                {activeCategory === 'Смотрю' && <Films />}
                                {activeCategory === 'Играю' && <Games />}
                                {activeCategory === 'Слушаю' && <Music />}
                            </div>

                        </div>
                    </div>

                    <Player/>

                </div>
            </section>
        </div>
    )
        ;
};

export default ModelProfile;