import React, {useEffect, useRef, useState} from 'react';
import s from "./ChatContainer.module.css"
import {v4 as uuidv4} from "uuid";
import {useReceiveMessageMutation, useSendMessageMutation} from "../../features/commonApiSlice";

const ChatContainer = ({socket, currentChat, user, oauthUser}) => {
    const [msg, setMsg] = useState("");
    const scrollRef = useRef();
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);

    const [receiveMessage, {isLoading: isReceiveMessageLoading}] = useReceiveMessageMutation();
    const [sendMessage, {isLoading: isSendMessageLoading}] = useSendMessageMutation();
    const handleSendMsg = async (msg) => {

        if (user) {
            socket.current.emit("send-msg", {
                to: currentChat._id,
                from: user.id,
                msg,
            });
            await sendMessage({from: user.id, to: currentChat._id, message: msg});
        } else if (oauthUser) {
            socket.current.emit("send-msg", {
                to: currentChat._id,
                from: oauthUser.user.id,
                msg,
            });
            await sendMessage({from: oauthUser.user.id, to: currentChat._id, message: msg});
        }
        const msgs = [...messages];
        msgs.push({fromSelf: true, message: msg});
        setMessages(msgs);
    };
    useEffect(() => {
        if (currentChat) {
            if (user) {
                const takeResponse = async () => {
                    const response = await receiveMessage({from: user.id, to: currentChat._id});
                    setMessages(response.data);
                }
                takeResponse();

            } else if (oauthUser) {
                const takeResponse = async () => {
                    const response = await receiveMessage({from: oauthUser.user.id, to: currentChat._id});
                    setMessages(response.data);
                }
                takeResponse();
            }
        }
    }, [currentChat]);
    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-recieve", (msg) => {
                setArrivalMessage({fromSelf: false, message: msg});
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
            {messages.map((message) => {
                return (
                    <div ref={scrollRef} key={uuidv4()}>
                        <div
                            className={`message ${
                                message.fromSelf ? "sended" : "recieved"
                            }`}
                        >
                            <div className="content ">
                                <p>{message.message}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
            <form className={s.inputContainer} onSubmit={(event) => sendChat(event)}>
                <input
                    type="text"
                    placeholder="type your message here"
                    onChange={(e) => setMsg(e.target.value)}
                    value={msg}
                />
                <button type="submit">Отправить</button>
            </form>
        </div>
    );
};

export default ChatContainer;