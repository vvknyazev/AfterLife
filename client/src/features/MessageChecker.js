import React, {useEffect, useRef} from 'react';
import {Outlet, useLocation} from "react-router-dom";
import {useGetUserQuery} from "./auth/authApiSlice";
import {useAddContactMutation, useGetOauthUserQuery, useReceiveMessageMutation} from "./commonApiSlice";
import io from "socket.io-client";
import {InfinitySpin} from "react-loader-spinner";

const MessageChecker = () => {
    const {data: user, isLoading: isLoadingUser, isFetching} = useGetUserQuery();

    const {data: oauthUserData, isLoading: isLoadingOauthUser} = useGetOauthUserQuery();

    const [receiveMessage] = useReceiveMessageMutation();
    const [addContact] = useAddContactMutation();

    const location = useLocation();
    const isChatsPage = location.pathname === '/chats';

    const socket = useRef(null);
    useEffect(() => {
        if (user?.isActivated || oauthUserData) {

            // мне не нравиться, я не знаю сколько эта часть кода будет выполнятся
            socket.current = io(process.env.REACT_APP_API_URL);

            if (user) {
                socket.current.emit("add-user", user.id);
            } else if (oauthUserData) {
                socket.current.emit("add-user", oauthUserData.user.id);
            }
            // конец странной части кода

            if (socket.current) {
                socket.current.on("msg-recieve", async (msg, chatID) => {
                    console.log("MESSAGE RECEIVED in require act auth component: ", msg);
                    console.log("chatID: ", chatID);
                    if (user) {
                        const takeResponse = async () => {
                            const response = await receiveMessage({from: user.id, to: chatID});
                            console.log("responce data (MESSAGES): ", response.data)
                            if (response.data === [] || response.data.length === 1 || response.data.length === 0) {
                                console.log("addContact in MessageChecker");
                                await addContact({from: user.id, to: chatID}).unwrap();
                            }
                        }
                        if (!isChatsPage) {
                            await takeResponse();
                        }

                    } else if (oauthUserData) {
                        const takeResponse = async () => {
                            const response = await receiveMessage({from: oauthUserData.user.id, to: chatID});
                            console.log("responce data (MESSAGES): ", response.data)
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