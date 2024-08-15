import React from 'react';
import {useOutletContext} from "react-router-dom";
import Nav from "../../../components/Nav/Nav";
import s from './SettingsActivity.module.css'
import SettingsNav from "../../../components/SettingsNav/SettingsNav";

const SettingsActivity = () => {
    const [user] = useOutletContext();
    return (
        <div>
            <Nav user={user}/>
            <div className={s.settingsNav}>
                <SettingsNav/>
            </div>
        </div>
    );
};

export default SettingsActivity;
