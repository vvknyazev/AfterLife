import React from 'react';
import Nav from "../../components/Nav/Nav";
import MiniNav from "../../components/MiniNav/MiniNav";
import {useOutletContext} from "react-router-dom";

const Sessions = () => {
    const [user] = useOutletContext();
    return (
        <div>
            <Nav user={user}/>
            <MiniNav/>
        </div>
    );
};

export default Sessions;