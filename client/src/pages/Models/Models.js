import React, {useState} from 'react';
import Nav from "../../components/Nav/Nav";
import {useLocation, useNavigate, useOutletContext} from "react-router-dom";
import s from "./Models.module.css";
import Categories from "../../components/Categories/Categories";
import GirlsSection from "../Main/GirlsSection/GirlsSection";
import {useGetModelsQuery} from "../../features/commonApiSlice";
import {InfinitySpin} from "react-loader-spinner";
const Models = () => {
    // const [isLoggedIn, isActivated, oauthUser, userPicture] = useOutletContext();
    const [user, oauthUser] = useOutletContext();

    const [currentItems, setCurrentItems] = useState([]);

    // const myGames = useSelector((state) => state.games);
    // const girls = useSelector((state) => state.girls);

    const { data: models, isLoading: isLoadingModels } = useGetModelsQuery();

    const [selectedCategory, setSelectedCategory] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const isHomePage = location.pathname === '/';
    function chooseCategory(category){
        setCurrentItems(models.filter(el => el.games.includes(category)))
        setSelectedCategory(category);
        if (isHomePage){
            navigate('/models')
        }
    }

    if (isLoadingModels) {
        return <div className={'loader'}>
            <InfinitySpin
                width='200'
                color="#000"
            />
        </div>
    }


    return (
        <div style={{background: "#000"}}>
            <Nav user={user} oauthUser={oauthUser}/>
            <section className={s.models}>
                <Categories chooseCategory={chooseCategory} selectedCategory={selectedCategory}/>
                {/*<Categories/>*/}
                <GirlsSection girlsCategory={currentItems} models={models}/>
            </section>
        </div>
    );
};

export default Models;