import React, {useEffect, useRef} from 'react';
import {Outlet, useLocation} from "react-router-dom";
import {useGetUserQuery} from "./auth/authApiSlice";
import {useAddContactMutation, useGetOauthUserQuery, useReceiveMessageMutation} from "./commonApiSlice";
import io from "socket.io-client";
import {InfinitySpin} from "react-loader-spinner";
import {useDispatch} from "react-redux";
import {setOnlineUsers} from "../redux/slices/onlineUsersSlice";

const MessageChecker = () => {
    const {data: user, isLoading: isLoadingUser, isFetching} = useGetUserQuery();

    const {data: oauthUserData, isLoading: isLoadingOauthUser} = useGetOauthUserQuery();

    const [receiveMessage] = useReceiveMessageMutation();
    const [addContact] = useAddContactMutation();


    const location = useLocation();
    const isChatsPage = location.pathname === '/chats';

    const socket = useRef(null);

    const dispatch = useDispatch();
    useEffect(() => {
        if (user?.isActivated || oauthUserData) {
            socket.current = io(process.env.REACT_APP_API_URL);
            if (user) {
                socket.current.emit("add-user", user.id);
                socket.current.on("getOnlineUsers", (users) => {
                    dispatch(setOnlineUsers(users));
                })
                socket.current.on("removeOnlineUsers", (users)=>{
                    dispatch(setOnlineUsers(users));
                })
            } else if (oauthUserData) {
                socket.current.emit("add-user", oauthUserData.user.id);
                socket.current.on("getOnlineUsers", (users) => {
                    dispatch(setOnlineUsers(users));
                })
                socket.current.on("removeOnlineUsers", (users)=>{
                    dispatch(setOnlineUsers(users));
                })
            }
        }

    }, [user, oauthUserData])

    useEffect(() => {
        if (user?.isActivated || oauthUserData) {

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

                    } else if (oauthUserData) {
                        const takeResponse = async () => {
                            const response = await receiveMessage({from: oauthUserData.user.id, to: chatID});
                            if (response.data === [] || response.data.length === 1 || response.data.length === 0) {
                                await addContact({from: oauthUserData.user.id, to: chatID});
                            }
                        }
                        if (!isChatsPage) {
                            await takeResponse();
                        }
                    }
                });
            }
        }

    }, [])

    if (isLoadingUser || isLoadingOauthUser) {
        return <div className={'loader'}>
            <InfinitySpin
                width='200'
                color="#000"
            />
        </div>
    }
    if (isFetching) {
        return <div className={'loader'}>
            <InfinitySpin
                width='200'
                color="#000"
            />
        </div>
    }

    return <Outlet context={[user, oauthUserData, socket]}/>;
};

export default MessageChecker;