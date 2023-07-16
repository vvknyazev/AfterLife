import React from 'react';
import {useOutletContext} from "react-router-dom";
import Nav from "../../components/Nav/Nav";
import MiniNav from "../../components/MiniNav/MiniNav";

const Chats = () => {
    const [user, oauthUser] = useOutletContext();
    return (
        <div>
            <Nav user={user} oauthUser={oauthUser}/>
            <MiniNav/>
        </div>
    );
};

export default Chats;