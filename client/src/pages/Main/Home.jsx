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

    const imaginativeUser = {
        username: 'Ма',
        homePagePhoto: '/imaginative-user.png'
    }

    const imaginativeModel = {
        name: 'Ким',
        homePagePhoto: '/imaginative-model.png'
    }

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
                <div>
                    <Nav user={user} oauthUser={oauthUser}/>
                    <HeaderHomePage/>
                </div>
                {/*<ConceptHomePage user={imaginativeUser} model={imaginativeModel}/>*/}
                <Strip/>
                <FooterHomePage/>
            </div>
        </div>
    );
};

export default Home;