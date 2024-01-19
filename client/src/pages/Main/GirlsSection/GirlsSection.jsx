import React from 'react';
import s from './GirlsSection.module.css'

import Card from "../../../components/Card/Card";

const GirlsSection = (props) => {
    // const girls = useSelector((state) => state.girls);

    console.log("girlsCategory:: ", props.girlsCategory)
    let cardGirls
    if (props.girlsCategory !== [] && props.girlsCategory !== undefined && props.girlsCategory.length !== 0) {
        // console.log("asd", girlsC)
        cardGirls = props.girlsCategory.map(el => <Card img={`${process.env.REACT_APP_API_URL}/${el.photo}`} name={el.name} desc={el.bio} games={el.games}
                                                        key={el._id} id={el._id}/>);
    } else {
        console.log("models:", props.models);
        cardGirls = props.models.map(el => <Card img={`${process.env.REACT_APP_API_URL}/${el.photo}`} name={el.name} desc={el.bio} games={el.games}
                                                 key={el._id} id={el._id}/>)
    }

    return (
        <div className={s.container}>
            <div className={s.girlsPosition}>
                <div className={s.girls}>
                    {cardGirls}
                </div>
            </div>
        </div>
    );
};

export default GirlsSection;