import React from 'react';
import s from './GirlsSection.module.css'
import Card from "../Header/Card/Card";
import {useSelector} from "react-redux";
const GirlsSection = () => {
    const girls = useSelector((state) => state.girls);

    const cardGirls = girls.map( el => <Card img={el.img} name={el.name} desc={el.desc}/>);
    return (
        <div className={s.container}>
            {cardGirls}
        </div>
    );
};

export default GirlsSection;