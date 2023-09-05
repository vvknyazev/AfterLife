import React, {useEffect, useState} from 'react';
import s from "./Contacts.module.css"

const Contacts = ({contacts, changeChat, user, oauthUser, onlineUsers}) => {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);
    const [currentOnlineUsers, setCurrentOnlineUsers] = useState([]);

    useEffect(()=>{
        if (onlineUsers){
            setCurrentOnlineUsers(onlineUsers);
        }
    }, [onlineUsers])

    useEffect(() => {
        if (contacts.length > 0 || contacts !== []) {
            setCurrentSelected(0);
            changeChat(contacts[0]);
        }
        if (user) {
            setCurrentUserName(user.username);
            setCurrentUserImage(`${process.env.REACT_APP_API_URL}/${user.photo}`);
        } else if (oauthUser) {
            setCurrentUserName(oauthUser.user.username);
            setCurrentUserImage(`${process.env.REACT_APP_API_URL}/${oauthUser.user.photo}`);
        }
        if (onlineUsers){
            setCurrentOnlineUsers(onlineUsers);
        }

    }, []);
    useEffect(() => {
        if (contacts.length > 0 || contacts !== []) {
            setCurrentSelected(0);
            changeChat(contacts[0]);
        }
    }, [contacts])
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
                                    src={`${process.env.REACT_APP_API_URL}/${user?.photo}` || `${process.env.REACT_APP_API_URL}/${oauthUser?.user?.photo}`}
                                    alt="profile-photo"
                                />
                            </div>
                            <div className={s.desc}>
                                <div>
                                    <h3>{user?.name || oauthUser?.user?.name}</h3>
                                </div>
                                <div>
                                    <p>Активные чаты</p>
                                </div>
                            </div>
                        </div>
                        {contacts.map((contact, index) => {
                            return (
                                <div
                                    key={contact._id}
                                    className={`${s.contact} ${
                                        index === currentSelected ? s.selected : ""
                                    }`}
                                    onClick={() => changeCurrentChat(index, contact)}
                                >
                                    <div className={s.avatar}>
                                        {currentOnlineUsers.includes(contact.id) && <div className='onlineIco'></div> }
                                        <img
                                            src={`${process.env.REACT_APP_API_URL}/${contact.photo}`}
                                            alt="profile-photo"
                                        />

                                    </div>
                                    <div className="username">
                                        <h3>{contact.name}</h3>
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