import React from 'react';
// import {InfinitySpin} from "react-loader-spinner";
import Nav from "../../components/Nav/Nav";
import HeaderHomePage from "./HeaderHomePage/HeaderHomePage";
import Strip from "./Strip/Strip";
import ConceptHomePage from "./ConceptHomePage/ConceptHomePage";
import FooterHomePage from "./FooterHomePage/FooterHomePage";
import {useOutletContext} from "react-router-dom";
import s from './Home.module.css'
import ImageComponent from "../../components/ImageComponent/ImageComponent";

const Home = () => {
    const [user] = useOutletContext();

    const imaginativeUser = {
        username: 'Ма',
        homePagePhoto: '/imaginative-user.png'
    }

    const imaginativeModel = {
        name: 'Ким',
        homePagePhoto: '/imaginative-model.png'
    }

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
        {id: 9, img: "/home/games/10.png"},
        {id: 9, img: "/home/games/11.png"},
        {id: 9, img: "/home/games/12.png"},
        {id: 9, img: "/home/games/13.png"},
        {id: 9, img: "/home/games/14.png"},
        {id: 9, img: "/home/games/15.png"},
    ]

    return (
        <div className='afterlife-back'>
            <div>
                <div>
                    <Nav user={user}/>
                    <HeaderHomePage/>
                </div>
                <div className={s.activites}>
                    <h3>Активности и события</h3>
                    <p>Более 100 вариантов активностей <br/> для проведения времени с тиммейтом</p>
                    <div className={s.games}>
                        {
                            games.map((game) => (
                                <div className={s.gameItem} key={game.id}>
                                    <ImageComponent hash={'LgLyZT80^+={-:tRIVM{-ptRNHV@'} width={'17.7vw'}
                                                    height={'10vw'} src={game.img} alt={game.id}/>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className={s.spotlight}>
                <h3>Spotlight AI</h3>
                <p>Современная система анализирует ваши предпочтения, чтобы <br/> подобрать вам наиболее подходящих
                    Хостов и пользователей, создавая <br/> яркое и увлекательное сообщество, подобного которому нет
                    нигде</p>
                <img src="/home/spotlight.png" alt="spotlight"/>
            </div>
            <div className={s.sessions}>
                <h3>Сессии</h3>
                <p>Три типа сессий, подходящие под разные активности</p>
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
                <p>Пользователи, с которыми вы можете создать сессии прямо сейчас</p>
            </div>
        </div>
    );
};

export default Home;
