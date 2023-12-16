import React, {useEffect, useState} from 'react';
import {useOutletContext} from "react-router-dom";
import Nav from "../../components/Nav/Nav";
import MiniNav from "../../components/MiniNav/MiniNav";
import {useGetAllContactsMutation} from "../../features/commonApiSlice";
import {InfinitySpin} from "react-loader-spinner";
import s from './Chats.module.css';
import ChatContainer from "../../components/ChatContainer/ChatContainer";
import Contacts from "../../components/Contacts/Contacts";
import {useSelector} from "react-redux";
import {useChat} from "../../context/ChatProvider";

const Chats = () => {
    const [user, oauthUser, socket] = useOutletContext();
    // const location = useLocation();
    // const receivedData = location.state;
    // const {data: model, isLoading} = useGetOneModelQuery(receivedData?.from?.pathname?.substring(1));
    const [getContacts, {isLoading: isContactsLoading}] = useGetAllContactsMutation();

    // const [currentChat, setCurrentChat] = useState(undefined);
    const { currentChat, setCurrentChat, setLastSenderID } = useChat();
    console.log("currentChat: ", currentChat);
    const [contacts, setContacts] = useState([]);

    const onlineUsers = useSelector(state => state.onlineUsers.value);
    const takeContacts = async () => {
        if (user) {
            const contacts = await getContacts({from: user.id});

            if (contacts.data) {
                setContacts(contacts.data);
            } else {
                setContacts([]);
            }
        } else if (oauthUser) {
            const contacts = await getContacts({from: oauthUser.user.id});

            if (contacts.data) {
                setContacts(contacts.data);
            } else {
                setContacts([]);
            }
        }
    }
    useEffect(() => {

        takeContacts();

    }, [])

    // console.log("online users: ", onlineUsers)

    const handleChatChange = (chat) => {
        setCurrentChat(chat);
        setLastSenderID(chat.id);
    };

    if (isContactsLoading) {
        return <div>
            <Nav user={user} oauthUser={oauthUser}/>
            <MiniNav/>
            <div className={'loader'}>
                <InfinitySpin
                    width='200'
                    color="#000"
                />
            </div>
        </div>
    }

    return (
        <div>
            <Nav user={user} oauthUser={oauthUser}/>
            <MiniNav/>
            <div className={s.chats}>
                <Contacts contacts={contacts} changeChat={handleChatChange} user={user} oauthUser={oauthUser}
                          onlineUsers={onlineUsers}/>
                <ChatContainer socket={socket} user={user} oauthUser={oauthUser}
                               setContacts={setContacts} contacts={contacts} onlineUsers={onlineUsers}/>
            </div>
        </div>
    );
};

export default Chats;