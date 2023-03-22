import React from 'react';
import s from './Header.module.css';
import Caregories from "./Categories/Caregories";

const Header = () => {
    return (
        <div className={s.header}>
            <Caregories/>
            <div><p className={s.title}>Мы поможем найти вам идеальную игровую пару</p></div>
            <div className={'tenor-gif-embed'  + ' ' + s.gif} data-postid="27127278" data-share-method="host" data-aspect-ratio="1.35021"
                 data-width="30%"><a
                href="https://tenor.com/view/you-look-lonely-i-can-fix-that-bladerunner2049-gif-27127278">You Look
                Lonely I Can Fix That Bladerunner2049 GIF</a>from <a
                href="https://tenor.com/search/you+look+lonely+i+can+fix+that-gifs">You Look Lonely I Can Fix That
                GIFs</a></div>

        </div>
    );
};

export default Header;