import React, {createContext, useContext, useState} from 'react';

const ChatContext = createContext();

export const ChatProvider = ({children}) => {
    const [currentChat, setCurrentChat] = useState();
    const [lastSenderID, setLastSenderID] = useState();
    const [notifications, setNotifications] = useState([]);

    return (
        <ChatContext.Provider value={{
            currentChat,
            setCurrentChat,
            lastSenderID,
            setLastSenderID,
            notifications,
            setNotifications
        }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => useContext(ChatContext);
