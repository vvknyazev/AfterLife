import React from 'react';
import s from './GirlsSection.module.css'

import {useSelector} from "react-redux";
import Card from "../../../components/Card/Card";

const GirlsSection = (props) => {
    const girls = useSelector((state) => state.girls);

    console.log("props.models: ", props.models)
    let cardGirls
    // if (props.girlsCategory !== [] && props.girlsCategory !== undefined) {
    //     console.log('props detected ', props.girls1)
    //     cardGirls = props.girlsCategory.map(el => <Card img={el.img} name={el.name} desc={el.desc} g1={el.g1} g2={el.g2}
    //                                       g3={el.g3} g4={el.g4} key={el.id}/>);
    // } else {
    //     cardGirls = girls.map(el => <Card img={el.img} name={el.name} desc={el.desc} g1={el.g1} g2={el.g2}
    //                                       g3={el.g3} g4={el.g4} key={el.id}/>);
    // }
    cardGirls = props.models.map(el => <Card img={el.photo} name={el.name} desc={el.bio} games={el.games} key={el._id}/>)
    return (
        <div className={s.container}>
            {cardGirls}

        </div>
    );
};

export default GirlsSection;