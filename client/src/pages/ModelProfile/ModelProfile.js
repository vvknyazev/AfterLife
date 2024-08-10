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
import ImageComponent from "../../components/ImageComponent/ImageComponent";
import n from "../../components/Nav/Nav.module.css";

const activities = [
    {id: 1, img: "/profile/model-activity/1.png", hash: "LTFFgE~Ung%0_N%1M_oeE4NHM{WC", price: 12},
    {id: 2, img: "/profile/model-activity/2.jpg", hash: "L4B3A;vy00Tz05xW~AM|00K6_1n1", price: 12},
    {id: 3, img: "/profile/model-activity/3.png", hash: "L,F%43RQtmof%QofjdWEIpj^WAWB", price: 12},
    {id: 4, img: "/profile/model-activity/4.png", hash: "LNKK4-0-~WogxeRjE2a{+cNaRO$x", price: 12},
    {id: 5, img: "/profile/model-activity/5.jpg", hash: "LR9aQ_XU9ur=cuo}i^V@Oug3sjaK", price: 12},
    {id: 6, img: "/profile/model-activity/1.png", hash: "LR9aQ_XU9ur=cuo}i^V@Oug3sjaK", price: 12},
    {id: 7, img: "/profile/model-activity/5.jpg", hash: "LR9aQ_XU9ur=cuo}i^V@Oug3sjaK", price: 12},
    {id: 8, img: "/profile/model-activity/5.jpg", hash: "LR9aQ_XU9ur=cuo}i^V@Oug3sjaK", price: 12},
    {id: 9, img: "/profile/model-activity/1.png", hash: "LR9aQ_XU9ur=cuo}i^V@Oug3sjaK", price: 12},
]

const ModelProfile = () => {

    const [user] = useOutletContext();
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
            <Nav user={user}/>
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
            console.log("from user.id: ", user);
            await addContact({from: user.id, to: location.pathname?.substring(1)});
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
            <Nav user={user}/>
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
                                        <p className={s.name}>{model?.name}<img src="/home/verified.svg"
                                                                                alt="verified"/></p>
                                        <p className={s.bio}>{`@${model?.username}`}</p>
                                    </div>
                                    <div className={s.connectContainer}>
                                        <NavLink to={`/create-session/${modelId}`} className={s.connect}>Создать
                                            сессию</NavLink>
                                    </div>
                                    <div className={s.favourite}>
                                        <img src="/profile/heart.svg" alt="heart"/>
                                    </div>
                                </div>

                                {/*<div className={s.edit}>*/}
                                {/*    <button onClick={addUser} className={s.secondButton}>Написать (тест чата)</button>*/}
                                {/*</div>*/}
                            </div>
                        </div>
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
                    </div>

                </div>
                <div className={s.content}>
                    {/*<div className={s.shining2}></div>*/}
                    <div className={s.descContainer}>
                        <div className={s.info}>
                            {/*<div className={s.shining}></div>*/}
                            {/*<div className={s.shiningBackground}>*/}

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
                        {/*</div>*/}
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

                                {activeCategory === 'Смотрю' && <Films/>}
                                {activeCategory === 'Играю' && <Games/>}
                                {activeCategory === 'Слушаю' && <Music/>}
                            </div>

                        </div>
                    </div>

                    <Player/>

                </div>
                <div className={s.activity}>
                    <div className={s.activityNav}>
                        <div><p>Активности</p></div>
                        <div><p>События</p></div>
                    </div>
                    <div className={s.activityContent}>
                        {activities.map((e) => (
                            <div className={s.activityItem}>
                                <ImageComponent hash={e.hash} width={'30.2vw'} height={'16.66vw'} src={e.img}
                                                alt="watch"
                                                key={e.id}/>
                                <div className={s.price}>
                                    <p>от {e.price} <span className={s.currency}>金</span></p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
        ;
};

export default ModelProfile;
