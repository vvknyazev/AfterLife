import React from 'react';
// import {InfinitySpin} from "react-loader-spinner";
import Nav from "../../components/Nav/Nav";
import HeaderHomePage from "./HeaderHomePage/HeaderHomePage";
import Strip from "./Strip/Strip";
import ConceptHomePage from "./ConceptHomePage/ConceptHomePage";
import GirlsSection from "./GirlsSection/GirlsSection";
import FooterHomePage from "./FooterHomePage/FooterHomePage";
import {useOutletContext} from "react-router-dom";
// import {useSelector} from "react-redux";
// import {selectCurrentToken} from "../../features/auth/authSlice";

const Home = () => {
    // const [isLoading, setIsLoading] = useState(true);
    const [user, oauthUser] = useOutletContext();
    // const token = useSelector(selectCurrentToken)
    // const location = useLocation()

    // useEffect(() => {
    //     setTimeout(() => setIsLoading(false), 500); // имитируем загрузку страницы
    // }, []);
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
                {/*<GirlsSection/>*/}
                <Strip/>
                <FooterHomePage/>
            </div>
            {/*)}*/}
        </div>
    );
};

export default Home;