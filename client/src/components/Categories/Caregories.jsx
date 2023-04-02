import React from 'react';
import {useSelector} from "react-redux";
import Category from "./Category/Category";
import s from './Categories.module.css';

const Caregories = () => {
    const myGames = useSelector((state) => state.games);

    const categoriesGames = myGames.map( el => <Category games={el} key={el.id}/>);
    return (
        <div className={s.container}>
            {categoriesGames}
        </div>
    );
};

export default Caregories;