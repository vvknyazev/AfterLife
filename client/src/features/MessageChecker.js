import React, {useEffect, useRef} from 'react';
import {Outlet, useLocation} from "react-router-dom";
import {useGetUserQuery} from "./auth/authApiSlice";
import {
    useAddNotificationsMutation, useGetNotificationsMutation,
    useGetOauthUserQuery,
} from "./commonApiSlice";
import io from "socket.io-client";
import {useDispatch, useSelector} from "react-redux";
import {setOnlineUsers} from "../redux/slices/onlineUsersSlice";
import {useChat} from "../context/ChatProvider";

const MessageChecker = () => {
    const effectRan = useRef(false)

    const {data: user} = useGetUserQuery();

    const {data: oauthUserData} = useGetOauthUserQuery();

    const onlineUsers = useSelector(state => state.onlineUsers.value);

    // const [receiveMessage] = useReceiveMessageMutation();
    // const [addContact] = useAddContactMutation();
    const [addNotifications] = useAddNotificationsMutation();
    const [getNotifications] = useGetNotificationsMutation();

    const {currentChat, setCurrentChat, notifications, setNotifications} = useChat();
    const location = useLocation();
    const isChatsPage = location.pathname === '/chats';

    const socket = useRef(null);

    const dispatch = useDispatch();

    // console.log("CURRENT CHAT IN MESSAGECHECKER: ", currentChat);
    console.log("notifications: ", notifications)
    console.log("online users: ", onlineUsers);
    const takeNotifications = async () => {
        if (user) {
            const notif = await getNotifications({from: user.id});
            console.log("notif: ", notif)
            console.log("notif.data: ", notif.data)
            if (notif.data){
                setNotifications(notif.data);
            }
        } else if (oauthUserData){
            const notif = await getNotifications({from: oauthUserData.user.id});
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
            updateNotifications(user.id, notifications);
        }
    }, [notifications])

    useEffect(() => {
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') { // React 18 Strict Mode
            if (user?.isActivated || oauthUserData) {

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
                } else if (oauthUserData) {
                    socket.current.emit("add-user", oauthUserData.user.id);
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
    }, [user, oauthUserData])

    // useEffect(() => {
    //     if (user?.isActivated || oauthUserData) {
    //         if (socket.current) {
    //             socket.current.on("msg-recieve", async (msg, chatID) => {
    //                 if (user) {
    //                     const takeResponse = async () => {
    //                         const response = await receiveMessage({from: user.id, to: chatID});
    //                         if (response.data === [] || response.data.length === 1 || response.data.length === 0) {
    //                             await addContact({from: user.id, to: chatID}).unwrap();
    //                         }
    //                     }
    //                     if (!isChatsPage) {
    //                         await takeResponse();
    //                     }
    //
    //                 } else if (oauthUserData) {
    //                     const takeResponse = async () => {
    //                         const response = await receiveMessage({from: oauthUserData.user.id, to: chatID});
    //                         if (response.data === [] || response.data.length === 1 || response.data.length === 0) {
    //                             await addContact({from: oauthUserData.user.id, to: chatID});
    //                         }
    //                     }
    //                     if (!isChatsPage) {
    //                         await takeResponse();
    //                     }
    //                 }
    //             });
    //             return () => {
    //                 socket.current.off("msg-recieve")
    //             }
    //         }
    //     }
    //
    // }, [])

    console.log("current chat in messageChecker: ", currentChat);

    useEffect(() => {
        if (!isChatsPage) {
            setCurrentChat(undefined);
        }
    })

    useEffect(() => {
        if (user?.isActivated || oauthUserData) {
            const isCurrentChatInNotifications = notifications.some(notification => notification?.chatID === currentChat?.id);
            console.log("isCurrentChatInNotifications: ", isCurrentChatInNotifications)
            console.log("currentChat: ", currentChat);
            if (isCurrentChatInNotifications) {
                const filteredNotifications = notifications.filter(notification => notification.chatID !== currentChat.id);
                console.log("filteredNotifications: ", filteredNotifications)
                setNotifications(filteredNotifications);
                updateNotifications(user.id, filteredNotifications);
                // await addNotifications({"from": user.id, "notifications": filteredNotifications}).unwrap();
            }
            if (socket.current) {
                socket.current.on('get-notification', async (msg, chatID, data) => {
                    if (user) {
                        console.log("GET NOTIFICATION")
                        console.log("ChatID: ", chatID);
                        console.log("currentChat: ", currentChat);

                        if (currentChat?.id !== chatID) {
                            setNotifications(prev => [{chatID, ...data}, ...prev])
                            console.log("notifications that will be added: ", notifications);


                        } else {
                            console.log("chat is open: ", currentChat);
                            console.log("chat is open: ", chatID);
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

    // if (isLoadingUser || isLoadingOauthUser) {
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


    return <Outlet context={[user, oauthUserData, socket]}/>;
};

export default MessageChecker;