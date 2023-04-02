import React from 'react';
import s from './GirlsSection.module.css'

import {useSelector} from "react-redux";
import Card from "../../../components/Card/Card";
const GirlsSection = () => {
    const girls = useSelector((state) => state.girls);

    const cardGirls = girls.map( el => <Card img={el.img} name={el.name} desc={el.desc} g1={el.g1} g2={el.g2} g3={el.g3} g4={el.g4} key={el.id}/>);
    return (
        <div className={s.container}>
            {cardGirls}
        </div>
    );
};

export default GirlsSection;