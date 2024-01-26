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
    const [user, socket] = useOutletContext();
    // const location = useLocation();
    // const receivedData = location.state;
    // const {data: model, isLoading} = useGetOneModelQuery(receivedData?.from?.pathname?.substring(1));
    const [getContacts, {isLoading: isContactsLoading}] = useGetAllContactsMutation();
    const [messages, setMessages] = useState([]);

    // const [currentChat, setCurrentChat] = useState(undefined);
    const {currentChat, setCurrentChat, setLastSenderID} = useChat();
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
        }
    }
    useEffect(() => {
        takeContacts();

    }, [])

    // console.log("online users: ", onlineUsers)

    const handleChatChange = (chat) => {
        console.log("chat handle")
        setCurrentChat(chat);
        setLastSenderID(chat.id);
    };

    return (
        <div>
            <Nav user={user}/>
            <MiniNav/>
            <div className={s.chats}>
                <Contacts contacts={contacts} changeChat={handleChatChange} user={user}
                          onlineUsers={onlineUsers} messages={messages}/>
                <ChatContainer socket={socket} user={user}
                               setContacts={setContacts} contacts={contacts} onlineUsers={onlineUsers}
                               takeContacts={takeContacts} messages={messages} setMessages={setMessages}/>
            </div>
        </div>
    );
};

export default Chats;