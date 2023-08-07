import React, {useEffect, useRef, useState} from 'react';
import {useLocation, useOutletContext} from "react-router-dom";
import Nav from "../../components/Nav/Nav";
import MiniNav from "../../components/MiniNav/MiniNav";
import io from "socket.io-client";
import {useGetAllContactsMutation} from "../../features/commonApiSlice";
import {InfinitySpin} from "react-loader-spinner";
import s from './Chats.module.css';
import ChatContainer from "../../components/ChatContainer/ChatContainer";
import Contacts from "../../components/Contacts/Contacts";

const Chats = () => {
    const [user, oauthUser] = useOutletContext();

    const socket = useRef(null);
    const location = useLocation();
    const receivedData = location.state;
    // const {data: model, isLoading} = useGetOneModelQuery(receivedData?.from?.pathname?.substring(1));
    const [getContacts, {isLoading: isContactsLoading}] = useGetAllContactsMutation();

    const [currentChat, setCurrentChat] = useState(undefined);
    const [contacts, setContacts] = useState(null);

    console.log("contacts: ", contacts);

    const takeContacts = async () => {
        if (user) {
            const contacts = await getContacts({ from: user.id});

            if (contacts.data){
                setContacts(contacts.data);
            } else{
                setContacts([]);
            }
        } else if (oauthUser){
            const contacts = await  getContacts({from: oauthUser.user.id});

            if (contacts.data){
                setContacts(contacts.data);
            } else{
                setContacts([]);
            }
        }
    }

    useEffect(() => {

        takeContacts();

        // if (receivedData){
        //     console.log("receivedData", receivedData);
        //     handleChatChange(receivedData.from.pathname.substring(1))
        // }
        if (contacts){

        }

        socket.current = io(process.env.REACT_APP_API_URL);
        if (user) {
            console.log("user: ", user)
            socket.current.emit("add-user", user.id);
        } else if (oauthUser) {
            socket.current.emit("add-user", oauthUser.user.id);
        }

    }, [])

    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    };

    if (isContactsLoading) {
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
                <Contacts contacts={contacts} changeChat={handleChatChange} user={user} oauthUser={oauthUser}/>
                <ChatContainer socket={socket} currentChat={currentChat} user={user} oauthUser={oauthUser}/>
            </div>
        </div>
    );
};

export default Chats;