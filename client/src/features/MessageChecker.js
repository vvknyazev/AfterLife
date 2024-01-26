import React, {useEffect, useRef} from 'react';
import {Outlet, useLocation} from "react-router-dom";
import {useGetUserQuery} from "./auth/authApiSlice";
import {
    useAddContactMutation,
    useAddNotificationsMutation, useGetNotificationsMutation,
    useReceiveMessageMutation,
} from "./commonApiSlice";
import io from "socket.io-client";
import {useDispatch, useSelector} from "react-redux";
import {setOnlineUsers} from "../redux/slices/onlineUsersSlice";
import {useChat} from "../context/ChatProvider";

const MessageChecker = () => {
    const effectRan = useRef(false)

    const {data: user} = useGetUserQuery();

    const onlineUsers = useSelector(state => state.onlineUsers.value);

    const [receiveMessage] = useReceiveMessageMutation();
    const [addContact] = useAddContactMutation();
    const [addNotifications] = useAddNotificationsMutation();
    const [getNotifications] = useGetNotificationsMutation();

    const {currentChat, setCurrentChat, notifications, setNotifications} = useChat();
    const location = useLocation();
    const isChatsPage = location.pathname === '/chats';

    const socket = useRef(null);

    const dispatch = useDispatch();
    const takeNotifications = async () => {
        if (user) {
            const notif = await getNotifications({from: user.id})
            if (notif.data){
                setNotifications(notif.data);
            }
        }
    };

    const updateNotifications = async (from, filteredNotifications) => {
            await addNotifications({"from": from, "notifications": filteredNotifications}).unwrap();
    };

    useEffect(() => {
        takeNotifications();
    }, [])

    useEffect(() => {
        if (user) {
            if (notifications.length !== 0) {
                updateNotifications(user.id, notifications);
            }
        }
    }, [notifications])

    useEffect(() => {
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') { // React 18 Strict Mode
            if (user?.isActivated) {

                socket.current = io(process.env.REACT_APP_API_URL);
                console.log("create socket")
                if (user) {
                    socket.current.emit("add-user", user.id);
                    socket.current.on("getOnlineUsers", (users) => {
                        dispatch(setOnlineUsers(users));
                    })
                    socket.current.on("removeOnlineUsers", (users) => {
                        dispatch(setOnlineUsers(users));
                    })
                    return () => {
                        socket.current.off("getOnlineUsers")
                        socket.current.off("removeOnlineUsers")
                    }
                }
            }
        }
        return () => effectRan.current = true
    }, [user])

    useEffect(() => {
        if (user?.isActivated) {
            if (socket.current) {
                socket.current.on("msg-recieve", async (msg, chatID) => {
                    if (user) {
                        const takeResponse = async () => {
                            const response = await receiveMessage({from: user.id, to: chatID});
                            if (response.data === [] || response.data.length === 1 || response.data.length === 0) {
                                await addContact({from: user.id, to: chatID}).unwrap();
                            }
                        }
                        if (!isChatsPage) {
                            await takeResponse();
                        }

                    }
                });
                return () => {
                    socket.current.off("msg-recieve")
                }
            }
        }

    }, [])

    useEffect(() => {
        if (!isChatsPage) {
            setCurrentChat(undefined);
        }
    })

    useEffect(() => {
        if (user?.isActivated) {
            const isCurrentChatInNotifications = notifications.some(notification => notification?.chatID === currentChat?.id);
            if (isCurrentChatInNotifications) {
                const filteredNotifications = notifications.filter(notification => notification.chatID !== currentChat.id);
                setNotifications(filteredNotifications);
                updateNotifications(user.id, filteredNotifications);
                // await addNotifications({"from": user.id, "notifications": filteredNotifications}).unwrap();
            }
            if (socket.current) {
                socket.current.on('get-notification', async (msg, chatID, data) => {
                    if (user) {
                        console.log("GET NOTIFICATION")

                        if (currentChat?.id !== chatID) {
                            setNotifications(prev => [{chatID, ...data}, ...prev])
                        }
                    }
                })
                return () => {
                    socket.current.off("get-notification")
                }
            }


        }
        // console.log("useEffect in MessageChecker.js")
    }, [currentChat])

    // if (isLoadingUser) {
    //     return <div className={'loader'}>
    //         <InfinitySpin
    //             width='200'
    //             color="#000"
    //         />
    //     </div>
    // }
    // if (isFetching) {
    //     return <div className={'loader'}>
    //         <InfinitySpin
    //             width='200'
    //             color="#000"
    //         />
    //     </div>
    // }


    return <Outlet context={[user, socket]}/>;
};

export default MessageChecker;