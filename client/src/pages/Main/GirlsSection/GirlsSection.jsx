import React from 'react';
import s from './GirlsSection.module.css'

import Card from "../../../components/Card/Card";

const GirlsSection = (props) => {
    // const girls = useSelector((state) => state.girls);

    console.log("girlsCategory:: ", props.girlsCategory)
    let cardGirls
    if (props.girlsCategory !== [] && props.girlsCategory !== undefined && props.girlsCategory.length !== 0) {
        // console.log("asd", girlsC)
        cardGirls = props.girlsCategory.map(el => <Card img={el.photo} name={el.name} desc={el.bio} games={el.games}
                                                        key={el._id} id={el._id}/>);
    } else {
        console.log("asd", props.models);
        cardGirls = props.models.map(el => <Card img={el.photo} name={el.name} desc={el.bio} games={el.games}
                                                 key={el._id} id={el._id}/>)
    }

    return (
        <div className={s.container}>
            <div className={s.filters}>
                <select>
                    <option disabled selected hidden>Выберите язык</option>
                    <option value="someOption">Українська, москалику</option>
                    <option value="someOption">Українська, москалику</option>
                    <option value="someOption">Українська, москалику</option>
                </select>
                <select>
                    <option disabled selected hidden>Выберите сервис</option>
                    <option value="someOption">Сервис 1</option>
                    <option value="someOption">Сервис 2</option>
                    <option value="someOption">Сервис 3</option>
                </select>
            </div>
            <div className={s.girlsPosition}>
                <div className={s.girls}>
                    {cardGirls}
                </div>
            </div>
        </div>
    );
};

export default GirlsSection;