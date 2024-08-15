import React from 'react';
import Nav from "../../../components/Nav/Nav";
import {useOutletContext} from "react-router-dom";
import s from './SettingsFriends.module.css'
import SettingsNav from "../../../components/SettingsNav/SettingsNav";

const SettingsFriends = () => {
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

export default SettingsFriends;
