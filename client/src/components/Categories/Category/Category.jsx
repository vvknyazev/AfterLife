import React from 'react';
import s from './Category.module.css'

const Category = (props) => {
    return (
        <div className={props.selectedCategory === props.games.name ? `${s.box} ${s.active}` : s.box} onClick={() => {props.onClick(props.games.name)}}>
            <img src={props.games.img} alt="logo"/>
            <p className={s.pColor}>{props.games.name}</p>
        </div>
    );
};

export default Category;