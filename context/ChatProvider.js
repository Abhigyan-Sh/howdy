import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const ChatContext = createContext();

const ChatProvider = ({children}) => {
    const router = useRouter();
    const [ user, setUser ] = useState(null);
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        setUser(userInfo);
        if(!userInfo) {
            router.push('/');
        }
        else if(router.pathname === '/') {
            router.push('/chats');
        }
    }, [router]);
    return (
        <ChatContext.Provider value = {{ user, setUser }}>
            {children}
        </ChatContext.Provider>
    )
}

const chatState = () => {
    return useContext(ChatContext);
}

export { ChatProvider, chatState };
export default ChatProvider;