import React, {useEffect, useRef, useState} from 'react';
import s from "./ChatContainer.module.css"
import {v4 as uuidv4} from "uuid";
import {
    useAddContactMutation,
    useGetAllContactsMutation,
    useReceiveMessageMutation,
    useSendMessageMutation, useUpdateContactsMutation
} from "../../features/commonApiSlice";
import {InfinitySpin} from "react-loader-spinner";
import {useChat} from "../../context/ChatProvider";

const ChatContainer = ({socket, user, oauthUser, setContacts, contacts, onlineUsers}) => {
    const [msg, setMsg] = useState("");
    const scrollRef = useRef();
    const chatRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);


    const [receiveMessage, {isLoading}] = useReceiveMessageMutation();
    const [sendMessage] = useSendMessageMutation();
    const [addContact] = useAddContactMutation();
    const [getContacts, {isLoading: isLoadingContacts}] = useGetAllContactsMutation();
    const [updateContacts] = useUpdateContactsMutation();

    const {currentChat} = useChat();

    const {lastSenderID, setLastSenderID, currentContactSelected, setCurrentContactSelected} = useChat();

    // const [time, setTime] = useState('');

    function dateToFormatted(currentDate) {
        const day = currentDate.getDate().toString().padStart(2, '0');
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
        const year = currentDate.getFullYear();
        const hours = currentDate.getHours().toString().padStart(2, '0');
        const minutes = currentDate.getMinutes().toString().padStart(2, '0');
        const seconds = currentDate.getSeconds().toString().padStart(2, '0');

        return `${day}.${month}.${year}, ${hours}:${minutes}:${seconds}`;
    }

    function formatContacts(contactsArr, sender, to) {
        if (contactsArr) {
            let elementToMove = contactsArr.find(user => user.id === to);
            let indexToRemove = contactsArr.indexOf(elementToMove);

            if (elementToMove !== contactsArr[0]) {
                let newContactsArray = contactsArr.filter((item, index) => index !== indexToRemove);
                newContactsArray.unshift(elementToMove);
                console.log("newArray: ", newContactsArray);
                setContacts(newContactsArray);
                // if (currentContactSelected < contactsArr.indexOf(elementToMove) ) {
                //     setCurrentContactSelected(currentContactSelected + 1)
                // }
                if (user) {
                    updateContacts({from: sender, updatedContacts: newContactsArray});
                } else if (oauthUser) {
                    updateContacts({from: sender, updatedContacts: newContactsArray});
                }
            }
        }
    }

    const handleSendMsg = async (msg) => {
        if (user) {
            socket.current.emit("send-msg", {
                to: currentChat.id,
                from: user.id,
                msg: msg,
                chatID: user.id,
            });
            // setCurrentContactSelected(0);
            console.log("messages.length: ", messages.length)
            if (messages.length === 0) {
                await addContact({from: currentChat.id, to: user.id}).unwrap();
                // const contacts = await getContacts({from: user.id});
                // if (contacts.data) {
                //     // formatContacts(contacts.data, user.id, chatID);
                //     setContacts(contacts.data);
                // }
            }

            await sendMessage({from: user.id, to: currentChat.id, message: msg});
            formatContacts(contacts, user.id, currentChat.id);
            // const newContacts = await getContacts({from: user.id});
            // if (newContacts.data) {
            //     setContacts(newContacts.data);
            // }
        } else if (oauthUser) {
            socket.current.emit("send-msg", {
                to: currentChat.id,
                from: oauthUser.user.id,
                msg: msg,
                chatID: oauthUser.user.id,
            });
            if (messages.length === 0) {
                await addContact({from: currentChat.id, to: user.id}).unwrap();
            }
            // await addContact({from: currentChat.id, to: user.id});
            await sendMessage({from: oauthUser.user.id, to: currentChat.id, message: msg});
            formatContacts(contacts, oauthUser.id, currentChat.id);
            // const newContacts = await getContacts({from: oauthUser.user.id});
            // if (newContacts.data) {
            //     setContacts(newContacts.data);
            // }
        }
        const msgs = [...messages];
        msgs.push({fromSelf: true, message: msg, time: dateToFormatted(new Date())});
        setMessages(msgs);
    };
    useEffect(() => {
        if (currentChat) {
            chatRef?.current?.focus();
            if (user) {
                const takeResponse = async () => {
                    const response = await receiveMessage({from: user.id, to: currentChat.id});
                    setMessages(response.data);
                }
                takeResponse();

            } else if (oauthUser) {
                const takeResponse = async () => {
                    const response = await receiveMessage({from: oauthUser.user.id, to: currentChat.id});
                    setMessages(response.data);
                }
                takeResponse();
            }
        }
    }, [currentChat]);
    // console.log("messages: ", messages);
    // console.log("contacts: ", contacts);
    // useEffect(() => {
    //     console.log("useEffect ")
    //     const takeContactsFirstTime = async () => {
    //         console.log("i am in funciton")
    //         if (messages.length === 0) {
    //             console.log("YES")
    //             if (user) {
    //                 const contacts = await getContacts({from: user.id});
    //                 if (contacts.data) {
    //                     setContacts(contacts.data);
    //                 }
    //             } else if (oauthUser) {
    //                 const contacts = await getContacts({from: oauthUser.user.id});
    //                 if (contacts.data) {
    //                     setContacts(contacts.data);
    //                 }
    //             }
    //         }
    //     }
    //     takeContactsFirstTime();
    // }, []);
    console.log("lastSenderID: ", lastSenderID);
    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-recieve", async (msg, chatID) => {
                console.log("messages in receive msg socket 1: ", messages);
                if (user) {
                    setLastSenderID(chatID);
                    // let elementToMove = contacts.find(user => user.id === chatID);
                    // if (currentContactSelected < contacts.indexOf(elementToMove) ) {
                    //     setCurrentContactSelected(currentContactSelected + 1)
                    // }
                    formatContacts(contacts, user.id, chatID);
                    console.log("msg: ", msg);
                }
                setArrivalMessage({fromSelf: false, message: msg, time: dateToFormatted(new Date())});
                console.log("arrival message: ", arrivalMessage);
                // if (messages.length === 0) {
                //     if (user) {
                //         const contacts = await getContacts({from: user.id});
                //         if (contacts.data) {
                //             setContacts(contacts.data);
                //         }
                //     } else if (oauthUser) {
                //         const contacts = await getContacts({from: oauthUser.user.id});
                //         if (contacts.data) {
                //             setContacts(contacts.data);
                //         }
                //     }
                // }
            });
        }
    });
    useEffect(() => {
        arrivalMessage && lastSenderID === currentChat?.id && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages]);
    const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
            handleSendMsg(msg);
            setMsg("");
        }
    };

    if (isLoading || isLoadingContacts) {
        return <div className={s.dialog}>
            <InfinitySpin
                width='200'
                color="#000"
            />
        </div>;
    }
    return (
        <div className={s.dialog}>
            <div className={s.wrapper}>
                <div className={s.chatInfo}>
                    <div className={s.chatPhoto}>
                        {currentChat?.photo &&
                            <img src={`${process.env.REACT_APP_API_URL}/${currentChat?.photo}`} alt="chat-photo"/>}
                        {currentChat?.photo && onlineUsers.includes(currentChat?.id) &&
                            <div className='onlineIco'></div>}
                    </div>
                    <div>
                        <p>{currentChat?.name}</p>
                    </div>
                </div>
            </div>
            <div className={s.chatContainer}>
                {messages?.length === 0 && currentChat?._id ?
                    <div className={s.noMessage}>
                        <img src="/chat/no-message.png" alt="no-msg"/>
                        <p>У вас еще нет сообщений</p>
                    </div>
                    :
                    <></>
                }
                {currentChat && messages?.map((message) => {
                    // console.log("CURRENT CHAT : ", currentChat)
                    // console.log("message time: ", message.time);
                    const [datePart, timePart] = message.time?.split(', ');
                    const [day, month, year] = datePart?.split('.');
                    const [hours, minutes] = timePart?.split(':');

                    const date = new Date(year, month - 1, day, hours, minutes);
                    const chatTime = `${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '')}${date.getMinutes()}`;
                    return (
                        <div ref={scrollRef} key={uuidv4()}>
                            <div
                                className={`${s.message} ${
                                    message.fromSelf ? s.sended : s.recieved
                                }`}
                            >
                                <div className={s.content}>
                                    <p>{message.message}<span>{chatTime}</span></p>
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div className={s.bottomSide}>
                    {currentChat?._id
                        ?
                        <form className={s.inputContainer} onSubmit={(event) => sendChat(event)}>
                            <input
                                type="text"
                                placeholder="type your message here"
                                onChange={(e) => setMsg(e.target.value)}
                                value={msg}
                                maxLength={550}
                                ref={chatRef}
                            />
                            <button type="submit"><img className={s.sendImage} src="/chat/send-ico.svg" alt="send"/>
                            </button>
                        </form>
                        :
                        <form className={s.inputContainer} onSubmit={(event) => sendChat(event)}>
                            <input
                                type="text"
                                placeholder=""
                                onChange={(e) => setMsg(e.target.value)}
                                value={msg}
                                maxLength={550}
                                disabled={true}
                            />
                            <button disabled={true}><img src="/chat/lock.svg" alt="lock"/></button>
                        </form>
                    }

                </div>
            </div>
        </div>
    );
};

export default ChatContainer;