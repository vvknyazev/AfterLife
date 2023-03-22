import React from 'react';
import s from './Category.module.css'

const Category = (props) => {
    console.log(props.props);
    return (
        <div className={s.box}>
            <img src={props.games.img} alt="logo"/>
            <p className={s.pColor}>{props.games.name}</p>
        </div>
    );
};

export default Category;