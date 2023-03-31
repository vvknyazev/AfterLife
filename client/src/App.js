import './App.css';
import Nav from "./components/Nav/Nav";
import Header from "./components/Header/Header";
import React, {useEffect, useState} from "react";
import Strip from "./components/Strip/Strip";
import GirlsSection from "./components/GirlsSection/GirlsSection";
import Footer from "./components/Footer/Footer";
import Concept from "./components/Concept/Concept";
import {InfinitySpin} from 'react-loader-spinner'

function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 1000); // имитируем загрузку страницы
    }, []);
    return (
        <div>
            {isLoading ? (
                <div className={'loader'}>
                    <InfinitySpin
                        width='200'
                        color="#000"
                    />
                </div>
            ) : (
                <div>
                    <Nav/>
                    <Header/>
                    <Concept/>
                    <GirlsSection/>
                    <Strip/>
                    <Footer/>
                </div>
            )}
        </div>
    );
}

export default App;
