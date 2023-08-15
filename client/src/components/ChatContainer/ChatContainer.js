import React, {useEffect, useRef, useState} from 'react';
import s from "./ChatContainer.module.css"
import {v4 as uuidv4} from "uuid";
import {
    useAddContactMutation,
    useGetAllContactsMutation,
    useReceiveMessageMutation,
    useSendMessageMutation
} from "../../features/commonApiSlice";

const ChatContainer = ({socket, currentChat, user, oauthUser, setContacts}) => {
    const [msg, setMsg] = useState("");
    const scrollRef = useRef();
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);

    const [receiveMessage] = useReceiveMessageMutation();
    const [sendMessage] = useSendMessageMutation();
    const [addContact] = useAddContactMutation();
    const [getContacts] = useGetAllContactsMutation();

    console.log("this is ChatContainer component");
    const handleSendMsg = async (msg) => {

        if (user) {
            socket.current.emit("send-msg", {
                to: currentChat.id,
                from: user.id,
                msg: msg,
                chatID: user.id,
            });
            await sendMessage({from: user.id, to: currentChat.id, message: msg});

        } else if (oauthUser) {
            socket.current.emit("send-msg", {
                to: currentChat.id,
                from: oauthUser.user.id,
                msg: msg,
                chatID: user.id,
            });
            await sendMessage({from: oauthUser.user.id, to: currentChat.id, message: msg});
        }
        const msgs = [...messages];
        msgs.push({fromSelf: true, message: msg});
        setMessages(msgs);
    };
    useEffect(() => {
        if (currentChat) {
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
                setArrivalMessage({fromSelf: false, message: msg});
                console.log("MESSAGE RECEIVED in current chat container: ", msg);
                console.log("chatID: ", chatID);

                if (messages.length === 0) {
                    if (user) {
                        await addContact({from: user.id, to: chatID}).unwrap();
                        const contacts = await getContacts({from: user.id});
                        console.log("contacts from getContacts: ", contacts);
                        console.log("contacts data: ", contacts.data)
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
                    <div>
                        {currentChat?.photo ? <img src={currentChat?.photo} alt="chat-photo"/> : <></>}
                    </div>
                    <div>
                        <p>{currentChat?.name}</p>
                    </div>
                </div>
            </div>
            <div className={s.chatContainer}>
                {messages.length === 0 && currentChat?._id ?
                    <div className={s.noMessage}>
                        <img src="/chat/no-message.png" alt="no-msg"/>
                        <p>У вас еще нет сообщений</p>
                    </div>
                    :
                    <></>
                }
                {currentChat && messages.map((message) => {
                    return (
                        <div ref={scrollRef} key={uuidv4()}>
                            <div
                                className={`${s.message} ${
                                    message.fromSelf ? s.sended : s.recieved
                                }`}
                            >
                                <div className={s.content}>
                                    <p>{message.message}</p>
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