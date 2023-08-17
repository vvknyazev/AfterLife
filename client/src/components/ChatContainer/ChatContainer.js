import React, {useEffect, useRef, useState} from 'react';
import s from "./ChatContainer.module.css"
import {v4 as uuidv4} from "uuid";
import {
    useAddContactMutation,
    useGetAllContactsMutation,
    useReceiveMessageMutation,
    useSendMessageMutation
} from "../../features/commonApiSlice";

const ChatContainer = ({socket, currentChat, user, oauthUser, setContacts, onlineUsers}) => {
    const [msg, setMsg] = useState("");
    const scrollRef = useRef();
    const chatRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);

    const [receiveMessage] = useReceiveMessageMutation();
    const [sendMessage] = useSendMessageMutation();
    const [addContact] = useAddContactMutation();
    const [getContacts] = useGetAllContactsMutation();

    const [time, setTime] = useState('');

    function dateToFormatted(currentDate){
        const day = currentDate.getDate().toString().padStart(2, '0');
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
        const year = currentDate.getFullYear();
        const hours = currentDate.getHours().toString().padStart(2, '0');
        const minutes = currentDate.getMinutes().toString().padStart(2, '0');
        const seconds = currentDate.getSeconds().toString().padStart(2, '0');

        return `${day}.${month}.${year}, ${hours}:${minutes}:${seconds}`;
    }

    const handleSendMsg = async (msg) => {

        if (user) {
            socket.current.emit("send-msg", {
                to: currentChat.id,
                from: user.id,
                msg: msg,
                chatID: user.id,
            });
            await sendMessage({from: user.id, to: currentChat.id, message: msg});
            const contacts = await getContacts({from: user.id});
            if (contacts.data) {
                setContacts(contacts.data);
            }
        } else if (oauthUser) {
            socket.current.emit("send-msg", {
                to: currentChat.id,
                from: oauthUser.user.id,
                msg: msg,
                chatID: user.id,
            });
            await sendMessage({from: oauthUser.user.id, to: currentChat.id, message: msg});
            const contacts = await getContacts({from: oauthUser.user.id});
            if (contacts.data) {
                setContacts(contacts.data);
            }
        }
        const msgs = [...messages];
        msgs.push({fromSelf: true, message: msg, time: dateToFormatted(new Date())});
        setMessages(msgs);
    };
    useEffect(() => {
        if (currentChat) {
            chatRef.current.focus();
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
    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-recieve", async (msg, chatID) => {
                setArrivalMessage({fromSelf: false, message: msg, time: dateToFormatted(new Date())});

                if (messages.length === 0) {
                    if (user) {
                        await addContact({from: user.id, to: chatID}).unwrap();
                        const contacts = await getContacts({from: user.id});
                        if (contacts.data) {
                            setContacts(contacts.data);
                        }
                    } else if (oauthUser) {
                        await addContact({from: oauthUser.user.id, to: chatID}).unwrap();
                        const contacts = await getContacts({from: oauthUser.user.id});

                        if (contacts.data) {
                            setContacts(contacts.data);
                        }
                    }
                }
            });
        }
    }, []);
    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
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
    return (
        <div className={s.dialog}>
            <div className={s.wrapper}>
                <div className={s.chatInfo}>
                    <div className={s.chatPhoto}>
                        {currentChat?.photo && <img src={currentChat?.photo} alt="chat-photo"/>}
                        {currentChat?.photo && onlineUsers.includes(currentChat?.id) && <div className='onlineIco'></div>}
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