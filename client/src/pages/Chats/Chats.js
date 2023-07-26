import React, {useEffect, useRef, useState} from 'react';
import {useLocation, useOutletContext} from "react-router-dom";
import Nav from "../../components/Nav/Nav";
import MiniNav from "../../components/MiniNav/MiniNav";
import io from "socket.io-client";
import {useGetOneModelQuery} from "../../features/commonApiSlice";
import {InfinitySpin} from "react-loader-spinner";
import {v4 as uuidv4} from "uuid";
import s from './Chats.module.css';

const Chats = () => {
    const [user, oauthUser] = useOutletContext();

    const [msg, setMsg] = useState("");
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);

    const socket = useRef(null);
    const location = useLocation();
    const receivedData = location.state;
    const {data: model, isLoading} = useGetOneModelQuery(receivedData?.from?.pathname?.substring(1));

    useEffect(() => {
        if (receivedData) {
            socket.current = io(process.env.REACT_APP_API_URL);
            socket.current.emit("add-user", receivedData.from.pathname.substring(1));
            console.log(receivedData.from.pathname.substring(1));
            console.log("socket", socket);
        }
    }, [])


    const handleSendMsg = async (msg) => {

        if (user) {
            socket.current.emit("send-msg", {
                to: model._id,
                from: user._id,
                msg,
            });
        } else if (oauthUser) {
            socket.current.emit("send-msg", {
                to: model._id,
                from: oauthUser.user._id,
                msg,
            });
        }
        // await axios.post(sendMessageRoute, {
        //     from: data._id,
        //     to: currentChat._id,
        //     message: msg,
        // });

        const msgs = [...messages];
        msgs.push({fromSelf: true, message: msg});
        setMessages(msgs);
    };
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

    const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
            handleSendMsg(msg);
            setMsg("");
        }
    };

    if (isLoading) {
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
                {model ? <div className={s.users}>
                    <img src={model?.photo} alt="profile-photo"/>
                    <p>{model?.name}</p>
                </div> : <div className={s.users}>
                </div>}

                <div className={s.dialog}>
                    {messages.map((message) => {
                        return (
                            <div key={uuidv4()}>
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
                    <form className="input-container" onSubmit={(event) => sendChat(event)}>
                        <input
                            type="text"
                            placeholder="type your message here"
                            onChange={(e) => setMsg(e.target.value)}
                            value={msg}
                        />
                        <button type="submit">Отправить</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Chats;