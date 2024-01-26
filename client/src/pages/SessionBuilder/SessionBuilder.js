import React, {useState} from 'react';
import Nav from "../../components/Nav/Nav";
import {useOutletContext, useParams} from "react-router-dom";
import s from './SessionBuilder.module.css'
import {useGetOneModelQuery} from "../../features/commonApiSlice";
import TwoOfUsType from "../../components/Sessions/SessionsTypes/TwoOfUsType/TwoOfUsType";
import SessionTime from "../../components/Sessions/SessionTime/SessionTime";
import SessionCalendar from "../../components/Sessions/SessionCalendar/SessionCalendar";
import TypeOfSessions from "../../components/TypeOfSessions/TypeOfSessions";
import DoubleJointType from "../../components/Sessions/SessionsTypes/DoubleJointType/DoubleJointType";
import NotAloneType from "../../components/Sessions/SessionsTypes/NotAloneType/NotAloneType";
import SessionGames from "../../components/Sessions/SessionGames/SessionGames";
import Films from "../../components/Spotlight/Films/Films";
import SessionInviteModal from "../../components/Sessions/SessionInviteModal/SessionInviteModal";

const SessionBuilder = () => {

    const sessionPrices = [
        {
            time: '45 min',
            price: 10,
        },
        {
            time: '30 min',
            price: 7,
        },
        {
            time: '1 hr',
            price: 11,
        },
        {
            time: '1.5 hr',
            price: 15,
        },
    ]
    const sessionPricesForNotAloneType = [
        {
            time: '1 hr',
            price: 11,
        },
        {
            time: '1.5 hr',
            price: 15,
        },

    ]

    const freeSessions = [
        {
            day: new Date(2024, 0, 19),
            times: ['16:00', '17:00', '20:30', '22:30']
        },
        {
            day: new Date(2024, 0, 20),
            times: ['16:00', '17:00', '22:30']
        },
        {
            day: new Date(2024, 0, 25),
            times: ['12:00', '13:00', '17:30', '23:00']
        },
        {
            day: new Date(2024, 0, 26),
            times: ['12:00', '23:00']
        },
        {
            day: new Date(2024, 0, 27),
            times: ['17:30', '23:00']
        },
        {
            day: new Date(2024, 0, 30),
            times: ['12:00', '13:00', '23:00']
        },
        {
            day: new Date(2024, 0, 19),
            times: ['10:00', '16:30']
        },
        {
            day: new Date(2024, 0, 20),
            times: ['11:00', '12:30', '13:30', '14:30']
        },
        {
            day: new Date(2024, 1, 2),
            times: ['20:00', '21:00', '22:00', '23:00']
        },
        {
            day: new Date(2024, 1, 4),
            times: ['9:00', '11:00', '15:00']
        },
    ];

    const games = [
        {
            img: '/gameIcons/color/cs2.jpg',
            name: 'CS 2'
        },
        {
            img: '/gameIcons/color/valorant.png',
            name: 'Valorant'
        },
        {
            img: '/gameIcons/color/dota2.png',
            name: 'Dota2'
        },
        {
            img: '/gameIcons/color/pubg.png',
            name: 'PUBG'
        },
        {
            img: '/gameIcons/color/lol.png',
            name: 'League of Legends'
        },
    ]

    const [user] = useOutletContext();

    const {modelId} = useParams();

    const {data: model, isLoading} = useGetOneModelQuery(modelId);

    const [selectedSession, setSelectedSession] = useState('Just The Two of Us');
    const [selectedGame, setSelectedGame] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedNotAloneType, setSelectedNotAloneType] = useState('Смотреть');

    const sessionNames = ['Just The Two of Us', 'Double Double joint', 'You are (not) alone'];

    const handleGame = (game) => {
        setSelectedGame(game);
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
    }

    return (
        <div className={s.backgroundContainer}>
            <SessionInviteModal open={isModalOpen} closeModal={closeModal}/>
            <Nav user={user}/>
            <div className={s.container}>
                <div>
                    <h3>Виберите тип сессии</h3>
                    {selectedSession === 'Just The Two of Us' && <TwoOfUsType user={user} model={model}/>}
                    {selectedSession === 'Double Double joint' && <DoubleJointType user={user} model={model} openModal={openModal}/>}
                    {selectedSession === 'You are (not) alone' && <NotAloneType user={user} model={model} openModal={openModal}/>}

                    <div className={s.typesOfSessions}>
                        <TypeOfSessions
                            sessionNames={sessionNames}
                            selectedSession={selectedSession}
                            onSelectSession={(session) => setSelectedSession(session)}
                        />
                    </div>
                    <div className={s.chooseGameBlock}>
                        {selectedSession === 'You are (not) alone'
                            ? <div className={s.notAloneTypeChooseContainer}>
                                <div
                                    className={selectedNotAloneType === 'Смотреть' ? `${s.notAloneTypeChoose} ${s.activeNotAloneType}` : s.notAloneTypeChoose}
                                    onClick={() => setSelectedNotAloneType('Смотреть')}>
                                    <p>Смотреть</p>
                                </div>
                                <div
                                    className={selectedNotAloneType === 'Играть' ? `${s.notAloneTypeChoose} ${s.activeNotAloneType}` : s.notAloneTypeChoose}
                                    onClick={() => setSelectedNotAloneType('Играть')}>
                                    <p>Играть</p>
                                </div>
                            </div>
                            : <>
                                <h3>Выбери игру</h3>
                                <div className={s.chooseGame}>
                                    <SessionGames games={games} handleGame={handleGame} selectedGame={selectedGame}/>
                                    <div className={s.gameItem}>
                                        <p>Еще</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                             viewBox="0 0 24 24"
                                             fill="none">
                                            <line x1="2.83333" y1="6.16667" x2="12.8333" y2="16.1667" stroke="white"
                                                  strokeWidth="2.35702"/>
                                            <line y1="-1.17851" x2="14.1421" y2="-1.17851"
                                                  transform="matrix(-0.707107 0.707107 0.707107 0.707107 22.0173 7)"
                                                  stroke="white" strokeWidth="2.35702"/>
                                        </svg>
                                    </div>
                                </div>
                            </>
                        }

                    </div>
                </div>
                <div>
                    <h3>Длительность сессии</h3>
                    {
                        selectedSession === 'You are (not) alone'
                            ?
                            <SessionTime sessionPrices={sessionPricesForNotAloneType} setSelectedPrice={setSelectedPrice}/>
                            :
                            <SessionTime sessionPrices={sessionPrices} setSelectedPrice={setSelectedPrice}/>
                    }

                </div>
                <div>
                    {selectedSession === 'You are (not) alone'
                        ? selectedNotAloneType === 'Смотреть'
                            ?
                            <div>
                                <h3>Выбрать фильм</h3>
                                <Films sessionBuilder = {true}/>
                            </div>
                            :
                            <div>
                                <h3>Выбери игру</h3>
                                <div className={s.chooseGameIfNotAloneType}>
                                    <SessionGames games={games} handleGame={handleGame} selectedGame={selectedGame}/>
                                    <div className={s.gameItem}>
                                        <p>Еще</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                             viewBox="0 0 24 24"
                                             fill="none">
                                            <line x1="2.83333" y1="6.16667" x2="12.8333" y2="16.1667" stroke="white"
                                                  strokeWidth="2.35702"/>
                                            <line y1="-1.17851" x2="14.1421" y2="-1.17851"
                                                  transform="matrix(-0.707107 0.707107 0.707107 0.707107 22.0173 7)"
                                                  stroke="white" strokeWidth="2.35702"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        : <>
                            <h3>Дата и время</h3>
                            <SessionCalendar freeSessions={freeSessions}
                                             setSelectedTime={setSelectedTime}
                                             selectedDate={selectedDate}
                                             setSelectedDate={setSelectedDate}
                            />
                        </>
                    }
                    {selectedTime && selectedDate && selectedPrice && selectedGame
                        ?
                        <button className={s.bookSessionButton}>Забронировать</button>
                        :
                        <button className={s.bookSessionButtonDisabled}>Забронировать</button>
                    }

                    <div className={s.terms}>
                        <p>Условия использования <svg xmlns="http://www.w3.org/2000/svg" width="13" height="10"
                                                      viewBox="0 0 13 10" fill="none">
                            <path d="M7.83125 10V6H0.0262498L0 3.99H7.83125V0L12.2063 5L7.83125 10Z" fill="white"/>
                        </svg></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SessionBuilder;