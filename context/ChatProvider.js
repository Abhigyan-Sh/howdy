import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const ChatContext = createContext()

const ChatProvider = ({ children }) => {
    const router = useRouter()
    const [ user, setUser ] = useState(null)
    const [ chats, setChats ] = useState([])
    const [ selectedChat, setSelectedChat ] = useState(null)
    const [ notification, setNotification ] = useState([])

    useEffect(() => {
        if(router.pathname.split('/')[1] === 'checkYourMail') return

        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        setUser(userInfo)
        if(!userInfo) {
            router.push('/')
        }
        else if(router.pathname === '/') {
            router.push('/chats')
        }
    }, [router.pathname])
    
    return (
        <ChatContext.Provider value = {{ 
            user, 
            setUser, 
            chats, 
            setChats, 
            selectedChat, 
            setSelectedChat, 
            notification, 
            setNotification
        }}>
            {children}
        </ChatContext.Provider>
    )
}

const chatState = () => {
    return useContext(ChatContext)
}

export { ChatProvider, chatState }
export default ChatProvider