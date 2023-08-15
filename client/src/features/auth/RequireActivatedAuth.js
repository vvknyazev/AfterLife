import React, {useEffect} from 'react';
import {useGetUserQuery} from "./authApiSlice";
import {Outlet, useNavigate, useOutletContext} from "react-router-dom";
import {InfinitySpin} from "react-loader-spinner";
import {
    useGetOauthUserQuery,
} from "../commonApiSlice";

const RequireActivatedAuth = () => {
    const navigate = useNavigate();
    const { data: user, isLoading: isLoadingUser, isFetching, isSuccess} = useGetUserQuery();

    const { data: oauthUserData } = useGetOauthUserQuery();
    const [renderOutlet, setRenderOutlet] = React.useState(false);

    const [socket] = useOutletContext();
    console.log("socket in RequireActivatedAuth: ", socket);
    // const [receiveMessage] = useReceiveMessageMutation();
    // const [addContact] = useAddContactMutation();


    // const socket = useRef(null);
    // useEffect(()=>{
    //     socket.current = io(process.env.REACT_APP_API_URL);
    //
    //     if (user) {
    //         socket.current.emit("add-user", user.id);
    //     } else if (oauthUserData) {
    //         socket.current.emit("add-user", oauthUserData.user.id);
    //     }
    //
    //     if (socket.current) {
    //         socket.current.on("msg-recieve", async (msg, chatID) => {
    //             console.log("MESSAGE RECEIVED in require act auth component: ", msg);
    //             console.log("chatID: ", chatID);
    //             if (user) {
    //                 const takeResponse = async () => {
    //                     const response = await receiveMessage({from: user.id, to: chatID});
    //                     console.log("responce data (MESSAGES): ", response.data)
    //                     if (response.data === [] || response.data.length === 1){
    //                         await addContact({from: user.id, to: chatID}).unwrap();
    //                     }
    //                 }
    //                 takeResponse();
    //
    //             } else if (oauthUserData) {
    //                 const takeResponse = async () => {
    //                     const response = await receiveMessage({from: oauthUserData.user.id, to: chatID});
    //                     console.log("responce data (MESSAGES): ", response.data)
    //                     if (response.data === [] || response.data.length === 1){
    //                         await addContact({from: oauthUserData.user.id, to: chatID}).unwrap();
    //                     }
    //                 }
    //                 takeResponse();
    //             }
    //         });
    //     }
    //
    // }, [])

    // console.log("this is require activated auth component");

    useEffect(() => {
        if (isSuccess) {
            if (user) {
                if (user.isActivated) {
                    setRenderOutlet(true);
                } else {
                    navigate('/');
                }
            } else if (oauthUserData){
                setRenderOutlet(true);
            }else navigate('/');
        }
    }, [isSuccess, user, navigate]);

    if (isLoadingUser) {
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

    if (isSuccess && renderOutlet) {
        return <Outlet context={[user, oauthUserData, socket]}/>;
    } else {
        return <div></div>;
    }



};

export default RequireActivatedAuth;