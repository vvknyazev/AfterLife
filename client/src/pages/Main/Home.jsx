import React, {useEffect, useState} from 'react';
// import {InfinitySpin} from "react-loader-spinner";
import Nav from "../../components/Nav/Nav";
import HeaderHomePage from "./HeaderHomePage/HeaderHomePage";
import {useOutletContext} from "react-router-dom";
import s from './Home.module.css'
import ImageComponent from "../../components/ImageComponent/ImageComponent";
import Card from "../../components/Card/Card";
import {useGetModelsQuery} from "../../features/commonApiSlice";
import {Swiper, SwiperSlide} from "swiper/react";
import {FreeMode, Navigation} from 'swiper/modules';
import 'swiper/css/free-mode';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Home = () => {
    const [user] = useOutletContext();
    const {data: models, isLoading: isLoadingModels} = useGetModelsQuery();

    // const imaginativeUser = {
    //     username: 'Ма',
    //     homePagePhoto: '/imaginative-user.png'
    // }
    //
    // const imaginativeModel = {
    //     name: 'Ким',
    //     homePagePhoto: '/imaginative-model.png'
    // }

    const games = [
        {id: 1, img: "/home/games/1.png"},
        {id: 2, img: "/home/games/2.png"},
        {id: 3, img: "/home/games/3.png"},
        {id: 4, img: "/home/games/4.png"},
        {id: 5, img: "/home/games/5.png"},
        {id: 6, img: "/home/games/6.png"},
        {id: 7, img: "/home/games/7.png"},
        {id: 8, img: "/home/games/8.png"},
        {id: 9, img: "/home/games/9.png"},
        {id: 10, img: "/home/games/10.png"},
        {id: 11, img: "/home/games/11.png"},
        {id: 12, img: "/home/games/12.png"},
        {id: 13, img: "/home/games/13.png"},
        {id: 14, img: "/home/games/14.png"},
        {id: 15, img: "/home/games/15.png"},
    ]

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "Как работает площадка?",
            answer: "Spotlight AI — современная система, которая анализирует ваши предпочтения — фильмы, музыку, игры, в которые вы играете, чтобы подобрать вам наиболее подходящих Хостов и пользователей, создавая яркое и увлекательное сообщество, подобного которому нет нигде."
        },
        {
            question: "Что такое сессии и как они работают?",
            answer: "Spotlight AI — современная система, которая анализирует ваши предпочтения — фильмы, музыку, игры, в которые вы играете, чтобы подобрать вам наиболее подходящих Хостов и пользователей, создавая яркое и увлекательное сообщество, подобного которому нет нигде."
        },
        {
            question: "Что такое Spotlight AI?",
            answer: "Spotlight AI — современная система, которая анализирует ваши предпочтения — фильмы, музыку, игры, в которые вы играете, чтобы подобрать вам наиболее подходящих Хостов и пользователей, создавая яркое и увлекательное сообщество, подобного которому нет нигде."
        },
        {
            question: "Как быстро отвечают хосты?",
            answer: "Spotlight AI — современная система, которая анализирует ваши предпочтения — фильмы, музыку, игры, в которые вы играете, чтобы подобрать вам наиболее подходящих Хостов и пользователей, создавая яркое и увлекательное сообщество, подобного которому нет нигде."
        },
        {
            question: "Есть ли у вас какие-либо фильтры поиска хоста?",
            answer: "Spotlight AI — современная система, которая анализирует ваши предпочтения — фильмы, музыку, игры, в которые вы играете, чтобы подобрать вам наиболее подходящих Хостов и пользователей, создавая яркое и увлекательное сообщество, подобного которому нет нигде."
        }
    ];

    const [visibleGames, setVisibleGames] = useState(games);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1000) {
                setVisibleGames(games.slice(0, 8));
            } else {
                setVisibleGames(games);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (isLoadingModels) {
        return <div>
            <Nav user={user}/>

        </div>
    }

    return (
        <div className='afterlife-back'>
            <div>
                <div>
                    <Nav user={user}/>
                    <HeaderHomePage/>
                </div>
                <div className={s.activites}>
                    <h3>Активности и события</h3>
                    <p className={s.underHeader}>Более 100 вариантов активностей <br/> для проведения времени с
                        тиммейтом</p>
                    <div className={s.games}>
                        {visibleGames.map((game) => (
                            <div className={s.gameItem} key={game.id}>
                                {/*<ImageComponent*/}
                                {/*    hash={'LgLyZT80^+={-:tRIVM{-ptRNHV@'}*/}
                                {/*    width={'17.7vw'}*/}
                                {/*    height={'10vw'}*/}
                                {/*    src={game.img}*/}
                                {/*    alt={game.id}*/}
                                {/*/>*/}
                                <img src={game.img} alt={game.id}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={s.spotlight}>
                <h3>Spotlight AI</h3>
                <p className={s.underHeader}>Современная система анализирует ваши предпочтения, чтобы <br/> подобрать
                    вам наиболее подходящих
                    Хостов и пользователей, создавая <br/> яркое и увлекательное сообщество, подобного которому нет
                    нигде</p>
                <div className={s.spotlightMask}>
                    <img src="/home/spotlight.png" alt="spotlight"/>
                </div>
            </div>
            <div className={s.sessions}>
                <h3>Сессии</h3>
                <p className={s.underHeader}>Три типа сессий, подходящие под разные активности</p>
                <div className={s.sessionsType}>
                    <div className={s.typeItem}>
                        <img src="/home/2us.png" alt="2us" className={s.us}/>
                        <h4>2 of Us</h4>
                        <p>Сессия с одним хостом и одним пользователем. Персонализированный и целенаправленный опыт
                            позволяет сосредоточиться на потребностях и интересах одного человека</p>
                    </div>
                    <div className={s.typeItem}>
                        <img src="/home/joint.png" alt="joint" className={s.joint}/>
                        <h4>Double Joint</h4>
                        <p>Два пользователя и один хост. Такая конфигурация предлагает более динамичный совместный опыт,
                            с участием нескольких точек зрения и наборов интересов</p>
                    </div>
                    <div className={s.typeItem}>
                        <img src="/home/alone.png" alt="alone" className={s.alone}/>
                        <h4>You are (Not) Alone</h4>
                        <p>Групповая сессия с четырьмя пользователями и одним хостом. Этот формат способствует
                            социальному взаимодействию, групповым мероприятиям и общему опыту среди участников</p>
                    </div>

                </div>
            </div>
            <div className={s.hosts}>
                <h3>Хосты</h3>
                <p className={s.underHeader}>Пользователи, с которыми вы можете создать сессии прямо сейчас</p>
                <div className={s.models}>
                    <Swiper
                        breakpoints={{
                            0: {
                                slidesPerView: 2,
                            },
                            453: {
                                slidesPerView: 2.5,
                            },
                            546: {
                                slidesPerView: 3,
                            },
                            639: {
                                slidesPerView: 3.5,
                            },
                            771: {
                                slidesPerView: 4
                            },
                            865: {
                                slidesPerView: 4.5
                            },
                            999: {
                                slidesPerView: 5
                            },
                            1000: {
                                slidesPerView: 5.6
                            },
                            1700: {
                                slidesPerView: 5.6
                            }
                        }}
                        freeMode={true}
                        // loop={true}
                        navigation={true}
                        scrollbar={{draggable: true}} // Enable scrollbar
                        grabCursor={true}
                        modules={[FreeMode, Navigation]}
                    >
                        {models?.map((e) => (
                            <SwiperSlide key={e._id}>
                                <Card img={`${process.env.REACT_APP_API_URL}/${e.photo}`} name={e.name}
                                      desc={e.bio} games={e.games}
                                      key={e._id} id={e._id}/>
                            </SwiperSlide>
                        ))}
                        {models?.map((e) => (
                            <SwiperSlide key={e._id}>
                                <Card img={`${process.env.REACT_APP_API_URL}/${e.photo}`} name={e.name}
                                      desc={e.bio} games={e.games}
                                      key={e._id} id={e._id}/>
                            </SwiperSlide>
                        ))}

                    </Swiper>
                </div>

            </div>
            <div className={s.mask}>
                <div className="faq-section">
                    <h2>FAQs</h2>
                    {faqs.map((faq, index) => (
                        <div key={index} className="faq-item" onClick={() => toggleFAQ(index)}>
                            <div className="faq-question">
                                {faq.question}
                                <span className="arrow">
                                {activeIndex === index ?
                                    <img src="/home/arrow-active.svg" alt="arrow"/>
                                    :
                                    <img src="/home/arrow-disable.svg" alt="arrow"/>
                                }
                            </span>
                            </div>
                            <div className={`faq-answer ${activeIndex === index ? 'active' : ''}`}>
                                {faq.answer}
                            </div>
                        </div>
                    ))}
                </div>
                <div className={s.footer}>
                    <div className={s.footerFlex}>
                        <img className={s.logo} src="/home/afterlife-logo.svg" alt="logo"/>
                        <p className={s.mobileText}>Afterlife — площадка для поиска напарника</p>
                        <div className={s.footerColumns}>
                            <div>
                                <p>О нас</p>
                                <p>Spotlight AI</p>
                                <p>Найти напарника</p>
                                <p>FAQs</p>
                            </div>
                            <div>
                                <p>Email</p>
                                <p>Telegram</p>
                                <p>Instagram</p>
                                <p>TikTok</p>
                            </div>
                        </div>
                    </div>
                    <div className={s.underFooter}>
                        <p>© Afterlife, 2024</p>
                        <p>Все права защищены</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
