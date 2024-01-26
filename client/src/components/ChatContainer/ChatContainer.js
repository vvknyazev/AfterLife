import React, {useEffect, useRef, useState} from 'react';
import s from "./ChatContainer.module.css"
import {v4 as uuidv4} from "uuid";
import {
    useAddContactMutation, useAddNotificationsMutation,
    useReceiveMessageMutation,
    useSendMessageMutation, useUpdateContactsMutation
} from "../../features/commonApiSlice";
import {ThreeDots} from "react-loader-spinner";

// import {Audio} from 'react-loader-spinner'
import {useChat} from "../../context/ChatProvider";
// import ScrollableFeed from "react-scrollable-feed";
// import {useSelector} from "react-redux";

const ChatContainer = ({socket, user, setContacts, contacts, onlineUsers, takeContacts, messages, setMessages}) => {
    const [msg, setMsg] = useState("");
    const [lastMsgs, setLastMsgs] = useState("");
    const scrollRef = useRef();
    const chatRef = useRef(null);
    // const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);

    const [receiveMessage, {isLoading}] = useReceiveMessageMutation();
    const [sendMessage] = useSendMessageMutation();

    const [addContact] = useAddContactMutation();
    // const [getContacts, {isLoading: isLoadingContacts}] = useGetAllContactsMutation();
    const [updateContacts] = useUpdateContactsMutation();
    const [addNotifications] = useAddNotificationsMutation();

    const {currentChat} = useChat();

    const {lastSenderID, setLastSenderID} = useChat();


    // const [time, setTime] = useState('');
    // useEffect(() => {
    //     console.log("auto scroll on the component load")
    //     console.log("scrollRef: ", scrollRef);
    //     scrollRef.current?.scrollIntoView({behavior: "auto"});
    // }, [messages]);
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
                if (user) {
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
            // if (messages.length === 0 ) {
            //     await addContact({from: currentChat.id, to: user.id}).unwrap();
            // }
            console.log("msg: ", msg)
            if (msg.trim() !== '') {
                console.log("SENDDD")
                await sendMessage({from: user.id, to: currentChat.id, message: msg});
            }
            if (!onlineUsers.includes(currentChat.id)){
                const chatID = user.id;
                await addNotifications({"from": currentChat.id, "notifications": {chatID}, "offline": true}).unwrap();
            }
            formatContacts(contacts, user.id, currentChat.id);

            // await addNotifications({from: currentChat.id, to: user.id}).unwrap();
        }
        if (msg.trim() !== '') {
            const msgs = [...messages];
            msgs.push({fromSelf: true, message: msg, time: dateToFormatted(new Date())});
            setMessages(msgs);
        }
    };
    useEffect(() => {
        if (currentChat) {
            chatRef?.current?.focus();
            if (user) {
                const takeResponse = async () => {
                    const response = await receiveMessage({from: user.id, to: currentChat.id});
                    setMessages(response.data);
                    setLastMsgs(response.data);
                }
                takeResponse();

            }
            // console.log("useEffect in ChatContainer.js")
        }


    }, [currentChat]);

    // console.log("lastSenderID: ", lastSenderID);
    useEffect(() => {
        if (socket.current === null) return;
        socket.current.on("msg-recieve", async (msg, chatID) => {
            console.log("messages in receive msg socket 1: ", messages);
            if (user) {
                setLastSenderID(chatID);
                formatContacts(contacts, user.id, chatID);
                // console.log("msg: ", msg);
                // console.log("ALL MESSAGES: ", messages);
                // console.log("cyka1(")
                if (messages.length === 0 || messages === []){
                    console.log("cyka2(")
                    await addContact({from: user.id, to: chatID}).unwrap();
                    takeContacts();
                }
            }
            setArrivalMessage({fromSelf: false, message: msg, time: dateToFormatted(new Date())});
            // console.log("arrival message: ", arrivalMessage);

        });
        return () => {
            socket.current.off("msg-recieve");
        }
    });
    useEffect(() => {
        arrivalMessage && lastSenderID === currentChat?.id && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);


    // const Scroll = () => {
    //     if (scrollRef.current){
    //         const { offsetHeight, scrollHeight, scrollTop } = scrollRef.current;
    //         console.log("offsetHeight: ", offsetHeight)
    //         console.log("scrollHeight: ", scrollHeight)
    //         console.log("scrollTop: ", scrollTop)
    //         if (scrollHeight <= scrollTop + offsetHeight + 100) {
    //             scrollRef.current.scrollTo(0, scrollHeight)
    //         }
    //     }
    //
    // }
    // useEffect(()=>{
    //     scrollRef.current?.scrollIntoView({behavior: "auto"});
    //     console.log("auto scroll arrivalMessage")
    // },[arrivalMessage])
    useEffect(() => {
        if (lastMsgs.length !== messages.length) {
            scrollRef.current?.scrollIntoView({behavior: "smooth"});
        } else{
            scrollRef.current?.scrollIntoView({behavior: "auto"});
        }
    }, [messages]);
    const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
            handleSendMsg(msg);
            setMsg("");
        }
    };

    if (isLoading) {
        return <div className={s.dialog}>
            <div className={s.chatContainer}>
                <div className={s.loader}>
                    <ThreeDots
                        height="90"
                        width="90"
                        radius="9   "
                        color="#fff"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                </div>
            </div>
        </div>
    }


    const groupMessagesByDay = (messages) => {
        const groupedMessages = [];
        let currentGroup = null;

        messages.forEach((message) => {
            const [datePart, timePart] = message.time?.split(', ');
            const [day, month, year] = datePart?.split('.');
            const [hours, minutes] = timePart?.split(':');

            const date = new Date(year, month - 1, day, hours, minutes);
            const chatTime = `${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '')}${date.getMinutes()}`;

            // Определение номера дня и названия месяца текстом
            const dayOfMonth = date.getDate();
            const monthText = new Intl.DateTimeFormat('en-US', {month: 'long'}).format(date);

            const formattedDate = `${dayOfMonth} ${monthText}`;

            if (!currentGroup || currentGroup.date !== formattedDate) {
                currentGroup = {
                    date: formattedDate,
                    messages: [],
                };
                groupedMessages.push(currentGroup);
            }

            currentGroup.messages.push({
                ...message,
                chatTime,
            });
        });

        return groupedMessages;
    };



    const groupedMessages = groupMessagesByDay(messages);

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
                {/*{*/}
                {/*    currentChat ? messages?.length === 0 && currentChat._id ?*/}
                {/*            <div className={s.noMessage}>*/}
                {/*                <img src="/chat/no-message.png" alt="no-msg"/>*/}
                {/*                <p>У вас еще нет сообщений</p>*/}
                {/*            </div>*/}
                {/*            :*/}
                {/*            <></>*/}
                {/*        :*/}
                {/*        <></>*/}

                {/*}*/}

                {currentChat &&
                    groupedMessages.map((group) => (
                        <div key={group.date}>
                            <div className={s.dayHeader}>{group.date}</div>
                            {group.messages.map((message) => (
                                <div ref={scrollRef} key={uuidv4()}>
                                    <div
                                        className={`${s.message} ${
                                            message.fromSelf ? s.sended : s.recieved
                                        }`}
                                    >
                                        <div className={s.content}>
                                            <p>{message.message}</p>
                                            <span>{message.chatTime}</span>
                                        </div>
                                    </div>
                                    <div >

                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
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