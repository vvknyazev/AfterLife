import React from 'react';
import Nav from "../../components/Nav/Nav";
import {useOutletContext} from "react-router-dom";
import s from "./Models.module.css";
const Models = () => {
    console.log('Models page');
    // const [isLoggedIn, isActivated, oauthUser, userPicture] = useOutletContext();
    return (
        <div style={{background: "#000"}}>
            <Nav/>
            <section className={s.models}>

            </section>
        </div>
    );
};

export default Models;