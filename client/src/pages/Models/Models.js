import React, {useState} from 'react';
import Nav from "../../components/Nav/Nav";
import {useLocation, useNavigate, useOutletContext} from "react-router-dom";
import s from "./Models.module.css";
import Categories from "../../components/Categories/Categories";
import {useSelector} from "react-redux";
import GirlsSection from "../Main/GirlsSection/GirlsSection";
const Models = () => {
    console.log('Models page');
    // const [isLoggedIn, isActivated, oauthUser, userPicture] = useOutletContext();
    const [user, oauthUser] = useOutletContext();

    const [currentItems, setCurrentItems] = useState([]);

    // const myGames = useSelector((state) => state.games);
    const girls = useSelector((state) => state.girls);

    const [selectedCategory, setSelectedCategory] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const isHomePage = location.pathname === '/';
    function chooseCategory(category){
        setCurrentItems(girls.filter(el => el.games.includes(category)))
        setSelectedCategory(category);
        if (isHomePage){
            navigate('/models')
        }
    }

    return (
        <div style={{background: "#000"}}>
            <Nav user={user} oauthUser={oauthUser}/>
            <section className={s.models}>
                <Categories chooseCategory={chooseCategory} selectedCategory={selectedCategory}/>
                <GirlsSection girlsCategory={currentItems}/>
            </section>
        </div>
    );
};

export default Models;