import React, {useEffect, useState} from 'react';
import {InfinitySpin} from "react-loader-spinner";
import Nav from "../../components/Nav/Nav";
import HeaderHomePage from "./HeaderHomePage/HeaderHomePage";
import Strip from "./Strip/Strip";
import ConceptHomePage from "./ConceptHomePage/ConceptHomePage";
import GirlsSection from "./GirlsSection/GirlsSection";
import FooterHomePage from "./FooterHomePage/FooterHomePage";

const Home = () => {
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
                    <HeaderHomePage/>
                    <ConceptHomePage/>
                    <GirlsSection/>
                    <Strip/>
                    <FooterHomePage/>
                </div>
            )}
        </div>
    );
};

export default Home;