import React, {useEffect, useRef, useState} from 'react';
import {useLocation, useOutletContext} from "react-router-dom";
import Nav from "../../components/Nav/Nav";
import MiniNav from "../../components/MiniNav/MiniNav";
import io from "socket.io-client";
import {useGetAllContactsQuery, useGetOneModelQuery} from "../../features/commonApiSlice";
import {InfinitySpin} from "react-loader-spinner";
import s from './Chats.module.css';
import ChatContainer from "../../components/ChatContainer/ChatContainer";
import Contacts from "../../components/Contacts/Contacts";

const Chats = () => {
    const [user, oauthUser] = useOutletContext();

    const socket = useRef(null);
    const location = useLocation();
    const receivedData = location.state;
    const {data: model, isLoading} = useGetOneModelQuery(receivedData?.from?.pathname?.substring(1));
    const {data: contacts, isLoading: isContactsLoading} = useGetAllContactsQuery();

    const [currentChat, setCurrentChat] = useState(undefined);

    if (contacts) {
        console.log("contacts: ", contacts);
    }

    useEffect(() => {
        //if (receivedData) {
        socket.current = io(process.env.REACT_APP_API_URL);
        // socket.current.emit("add-user", receivedData.from.pathname.substring(1));
        if (user) {
            console.log("user: ", user)
            socket.current.emit("add-user", user.id);
        } else if (oauthUser) {
            socket.current.emit("add-user", oauthUser.user.id);
        }

        // console.log(receivedData.from.pathname.substring(1));
        //}
    }, [])

    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    };

    if (isLoading || isContactsLoading) {
        return <div className={'loader'}>
            <InfinitySpin
                width='200'
                color="#000"
            />
        </div>;
    }

    return (
        <div>
            <Nav user={user} oauthUser={oauthUser}/>
            <MiniNav/>
            <div className={s.chats}>
                {/*{model ? <div className={s.users}>*/}
                {/*    <img src={model?.photo} alt="profile-photo"/>*/}
                {/*    <p>{model?.name}</p>*/}
                {/*</div> : <div className={s.users}>*/}
                {/*</div>}*/}
                <Contacts contacts={contacts} changeChat={handleChatChange} user={user} oauthUser={oauthUser}/>
                <ChatContainer socket={socket} currentChat={currentChat} user={user} oauthUser={oauthUser}/>

            </div>
        </div>
    );
};

export default Chats;