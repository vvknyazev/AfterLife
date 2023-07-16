import React from 'react';
import Nav from "../../components/Nav/Nav";
import MiniNav from "../../components/MiniNav/MiniNav";
import {useOutletContext} from "react-router-dom";

const Sessions = () => {
    const [user, oauthUser] = useOutletContext();
    return (
        <div>
            <Nav user={user} oauthUser={oauthUser}/>
            <MiniNav/>
        </div>
    );
};

export default Sessions;