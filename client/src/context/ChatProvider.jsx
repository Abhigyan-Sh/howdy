import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const ChatContext = createContext()

const ChatProvider = ({ children }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [ user, setUser ] = useState(null)
    const [ chats, setChats ] = useState([])
    const [ selectedChat, setSelectedChat ] = useState(null)
    const [ notification, setNotification ] = useState([])

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        setUser(userInfo)
        if(!userInfo) {
            navigate('/')
        }
        else if(location.pathname === '/') {
            navigate('/chats')
        }
    }, [location.pathname, navigate])
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