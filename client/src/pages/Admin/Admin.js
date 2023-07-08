import React from 'react';
import {useOutletContext} from "react-router-dom";

const Admin = () => {
    const [user, oauthUser] = useOutletContext();
    return (
        <div>
            <h1>Welcome to the Admin Panel</h1>
        </div>
    );
};

export default Admin;