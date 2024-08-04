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
import {useTranslation} from "react-i18next";
import 'swiper/css/free-mode';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import SearchModal from "../../components/SearchModal/SearchModal";


const Home = () => {
    const [user] = useOutletContext();
    const {data: models, isLoading: isLoadingModels} = useGetModelsQuery();

    const { t } = useTranslation()

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
            question: t("home.faq1"),
            answer: t("home.ans1"),
        },
        {
            question: t("home.faq2"),
            answer: t("home.ans2"),
        },
        {
            question: t("home.faq3"),
            answer: t("home.ans3"),
        },
        {
            question: t("home.faq4"),
            answer: t("home.ans4"),
        },
        {
            question: t("home.faq5"),
            answer: t("home.ans5"),
        },
        {
            question: t("home.faq6"),
            answer: t("home.ans6"),
        },
        {
            question: t("home.faq7"),
            answer: t("home.ans7"),
        },
        {
            question: t("home.faq8"),
            answer: t("home.ans8"),
        },
        {
            question: t("home.faq9"),
            answer: t("home.ans9"),
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
                    {/*<Nav user={user} openModal={openModal}/>*/}
                    <Nav user={user}/>
                    <HeaderHomePage/>
                </div>
                <div className={s.activites}>
                    <h3>{t('home.activity_header')}</h3>
                    <p className={`${s.underHeader} ${s.activitywidth}`}>{t('home.activity_underheader')}</p>
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
                <p className={`${s.underHeader} ${s.spotlightWidth}`}>{t('home.spotlight')}</p>
                <div className={s.spotlightMask}>
                    <img src="/home/spotlight.png" alt="spotlight"/>
                </div>
            </div>
            <div className={s.sessions}>
                <h3>{t("home.sessions")}</h3>
                <p className={s.underHeader}>{t("home.sessions_underheader")}</p>
                <div className={s.sessionsType}>
                    <div className={s.typeItem}>
                        <img src="/home/2us.png" alt="2us" className={s.us}/>
                        <h4>2 of Us</h4>
                        <p>{t("home.2us")}</p>
                    </div>
                    <div className={s.typeItem}>
                        <img src="/home/joint.png" alt="joint" className={s.joint}/>
                        <h4>Double Joint</h4>
                        <p>{t("home.joint")}</p>
                    </div>
                    <div className={s.typeItem}>
                        <img src="/home/alone.png" alt="alone" className={s.alone}/>
                        <h4>You are (Not) Alone</h4>
                        <p>{t("home.alone")}</p>
                    </div>

                </div>
            </div>
            <div className={s.hosts}>
                <h3>{t("home.hosts")}</h3>
                <p className={`${s.underHeader} ${s.hostsWidth}`}>{t("home.hosts_underheader")}</p>
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
                                <p>{t('nav.about')}</p>
                                <p>Spotlight AI</p>
                                <p>{t('nav.find_someone')}</p>
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
                        <p>{t("home.rights")}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
