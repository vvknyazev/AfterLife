import React from 'react';
import s from './Strip.module.css'

const Strip = () => {
    return (
        <div className={s.strip}>
            <div className={s.marqueeInfinite}>
                <div className={s.anim}>
                    <span>
                        <img src='/strip/strip1.png' alt=""/>
                    </span>
                    <span>
                        <img src='/strip/strip1.png' alt=""/>
                    </span>
                </div>
            </div>
            <div className={s.marqueeInfinite}>
                <div className={s.anim2}>
                    <span>
                        <img src='/strip/strip2.png' alt=""/>
                    </span>
                    <span>
                        <img src='/strip/strip2.png' alt=""/>
                    </span>
                </div>
            </div>
            <div className={s.marqueeInfinite}>
                <div className={s.anim3}>
                    <span>
                        <img src='/strip/strip3.png' alt=""/>
                    </span>
                    <span>
                        <img src='/strip/strip3.png' alt=""/>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Strip;