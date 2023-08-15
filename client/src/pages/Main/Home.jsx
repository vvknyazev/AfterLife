import React from 'react';
// import {InfinitySpin} from "react-loader-spinner";
import Nav from "../../components/Nav/Nav";
import HeaderHomePage from "./HeaderHomePage/HeaderHomePage";
import Strip from "./Strip/Strip";
import ConceptHomePage from "./ConceptHomePage/ConceptHomePage";
import FooterHomePage from "./FooterHomePage/FooterHomePage";
import {useOutletContext} from "react-router-dom";

const Home = () => {
    const [user, oauthUser] = useOutletContext();

    return (
        <div>
            {/*{isLoading ? (*/}
            {/*    <div className={'loader'}>*/}
            {/*        <InfinitySpin*/}
            {/*            width='200'*/}
            {/*            color="#000"*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*) : (*/}
            <div>
                <div style={{backgroundImage: "url(/home-background.png)", backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
                    <Nav user={user} oauthUser={oauthUser}/>
                    <HeaderHomePage/>
                </div>
                <ConceptHomePage/>
                <Strip/>
                <FooterHomePage/>
            </div>
        </div>
    );
};

export default Home;