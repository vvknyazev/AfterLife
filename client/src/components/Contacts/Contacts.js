import React, {useEffect, useState} from 'react';
import s from "./Contacts.module.css"
import {useChat} from "../../context/ChatProvider";

const Contacts = ({contacts, changeChat, user, onlineUsers, messages}) => {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);
    const [currentOnlineUsers, setCurrentOnlineUsers] = useState([]);
    const [lastMessage, setLastMessage] = useState('');

    const {currentChat, notifications} = useChat();

    function countNotifications(contactID) {
        return notifications.filter(notification => notification.chatID === contactID).length;
    }


    useEffect(()=>{
        if (onlineUsers){
            setCurrentOnlineUsers(onlineUsers);
        }
    }, [onlineUsers])

    useEffect(() => {
        if (contacts.length > 0 || contacts !== []) {
            // setCurrentSelected(0);
            // changeChat(contacts[0]);
        }
        if (user) {
            setCurrentUserName(user.username);
            console.log("user in contacts: ", user);
            setCurrentUserImage(user?.photo.includes('http') ? user?.photo : `${process.env.REACT_APP_API_URL}/${user?.photo}`);
        }
        if (onlineUsers){
            setCurrentOnlineUsers(onlineUsers);
        }

    }, []);
    useEffect(() => {
        // console.log("check contacts in useEffect [contacts]: ", contacts)
        // console.log("check currentChat in useEffect [contacts]: ", currentChat);
        if ((contacts.length > 0 || contacts !== [])) {

            const index = contacts.findIndex(contact => contact?.id === currentChat?.id);

            setCurrentSelected(index);

            // const index = contacts.findIndex(contact => contact.id === lastSenderID);
            // if (index !== -1){
            //     console.log("INDEX: ", index);
            //     setCurrentSelected(index);
            // }
            // setCurrentSelected(0);
            // changeChat(contacts[0]);
        }
    }, [contacts])
    // console.log("currentSelected: ", currentContactSelected)


    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    };
    return (
        <>
            {currentUserImage && currentUserImage && (
                <div className={s.users}>
                    <div className={s.contacts}>
                        <div className={s.currentUser}>
                            <div>
                                <img
                                    src={user?.photo.includes('http') ? user?.photo : `${process.env.REACT_APP_API_URL}/${user?.photo}`}
                                    alt="profile-photo"
                                />
                            </div>
                            <div className={s.desc}>
                                <div>
                                    <h3>{user?.username}</h3>
                                </div>
                                <div>
                                    <p>Активные чаты</p>
                                </div>
                                <div className={notifications.length > 0 ? `${s.notification}` : ''}>
                                    <h3>{notifications.length > 9 ? '9+' :  notifications.length > 0 ? notifications.length :''}</h3>
                                </div>
                            </div>
                        </div>
                        {contacts.map((contact, index) => {
                            console.log("contact: ", contact);
                            const notificationCount = countNotifications(contact?.id);
                            return (
                                <div
                                    key={contact?._id}
                                    className={`${s.contact} ${
                                        index === currentSelected ? s.selected : ""
                                    }`}
                                    onClick={() => changeCurrentChat(index, contact)}
                                >
                                    <div className={s.avatar}>
                                        {currentOnlineUsers.includes(contact?.id) && <div className='onlineIco'></div> }
                                        <img
                                            src={contact?.photo.includes('http') ? contact?.photo : `${process.env.REACT_APP_API_URL}/${contact?.photo}`}
                                            alt="profile-photo"
                                        />

                                    </div>
                                    <div className="username">
                                        <h3>{contact?.username}</h3>
                                    </div>
                                    <div className={notificationCount > 0 ? `${s.notification}` : ''}>
                                        <h3>{notificationCount > 9 ? '9+' :  notificationCount ? notificationCount :''}</h3>
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                    {/*<div className={s.currentUser}>*/}
                    {/*    <div className="avatar">*/}
                    {/*        <img*/}
                    {/*            src={currentUserImage}*/}
                    {/*            alt="avatar"*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*    <div className="username">*/}
                    {/*        <h2>{currentUserName}</h2>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            )}
        </>
    );
};

export default Contacts;