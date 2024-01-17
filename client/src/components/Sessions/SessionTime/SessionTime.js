import React, {useState} from 'react';
import s from './SessionTime.module.css';
import SessionTimeItem from "./SessionTimeItem/SessionTimeItem";
const SessionTime = ({sessionPrices, setSelectedPrice}) => {


    const [activeIndex, setActiveIndex] = useState(null);
    const handleItemClick = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
        setSelectedPrice(sessionPrices[index]);
    };

    return (
        <div className={s.container}>
            {sessionPrices.map((sessionPrice, index) => (
                <SessionTimeItem
                    key={index}
                    sessionPrice={sessionPrice}
                    isActive={index === activeIndex}
                    onClick={() => handleItemClick(index)}
                />
            ))}
        </div>
    );
};

export default SessionTime;