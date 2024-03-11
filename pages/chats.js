import { useState, useEffect } from 'react'
import Image from 'next/image'
import { chatState } from '../context/ChatProvider'
import MyChats from '../components/MyChats'
import ChatBox from '../components/ChatBox'
import Navbar from '../components/layout/Navbar'
import SnackbarToast, { setToastVisible }  from '../components/widgets/SnackbarToast'

const Chats = () => {
  const { user, chats, selectedChat, setSelectedChat, notification, setNotification } = chatState()
  /* @dev:: value is made to toggle between true and false where a  
  toggle indicates that chats need to be fetched again from database */
  const [ fetchAgain, setFetchAgain ] = useState(false)
  // -------toast-------
  const [ toastMessage, setToastMessage ] = useState('')
  const [ severity, setSeverity ] = useState('')
  const [ isToastOpen, onToastClose ] = useState(false)
  
  const handleToast = () => 
    onToastClose(false)

  useEffect(() => {
    if(!selectedChat || !user) return
    const updateReadBy = async () => {
      try {
        const response = await fetch('/api/readBy/', {
          method: 'POST',
          body: JSON.stringify({
            "messageId": selectedChat.latestMessage._id, 
            "userId": user._id, 
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${user.token}`
          }
        })
        const data = await response.json()
        if(data.statusCode && [400, 401, 404, 500].includes(data.statusCode)) {
          setToastVisible({
            _message: `Error ${data.statusCode}: ${data?.error}`, 
            _severity: "error", 
            setMessage: setToastMessage, 
            setSeverity: setSeverity, 
            onOpen: onToastClose
          })
        } else if (data.statusCode === 200) {
          const updateSelectedChat = selectedChat
          updateSelectedChat.latestMessage = data.message
          setSelectedChat(updateSelectedChat)
        }
      } catch (error) {
        setToastVisible({
          _message: `Error occurred while fetching notifications: ${error.message}`, 
          _severity: "error", 
          setMessage: setToastMessage, 
          setSeverity: setSeverity, 
          onOpen: onToastClose
        })
      }
    }
    updateReadBy()
  }, [selectedChat, user])
  
  // console.log('notification: ', notification)
  // console.log('selectedChat: ', selectedChat)

  useEffect(() => {
    if(!chats || !user) return
    chats.map((chat) => {
      if(!chat.latestMessage.readBy?.includes(user._id)) {
        console.log(chat)
        console.log(notification)
        setNotification([ chat, ...notification ])
      }
    })
  }, [chats, user])
  return (
    <>
      <div className="relative w-full h-screen overflow-auto no-scrollbar">
        {user && <Navbar/>}
        <div className='w-full h-[91.5vh] relative'>
          {/* -------background image------- */}
          <Image
            src="/assets/backgroundWallpaper.jpg" 
            alt="Background Image" 
            layout="fill" // fill entire parent container
            objectFit="cover" // cover entire parent container
            quality={60} 
            className="z-0" // ensure the background image is behind other content
            loading="lazy" 
          />
          {/* -------Optional: Overlay for background image------- */}
          <div className='absolute inset-0 bg-opacity-50 bg-gray-800'></div>
          {/* Other content: Chats */}
          <div className='w-full h-full flex flex-row items-center justify-between bg-transparent relative'>
            <div className='w-4/12 h-full flex flex-row items-center justify-center p-4 pr-2'>
              {user && <MyChats fetchAgain={fetchAgain} />}
            </div>
            <div className='w-8/12 h-full flex flex-row items-center justify-center p-4 pl-2'>
              {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
            </div>
          </div>
        </div>
      </div>
      {/* -------toast------- */}
      <SnackbarToast
        // key={"key-00"} 
        message={toastMessage} 
        open={isToastOpen} 
        onClose={handleToast} 
        delay={5000} 
        vertical="bottom" 
        horizontal="center" 
        severity={severity} 
        variant="filled"
        sx={{ width: '100%' }} 
        actionNumber={1} />
    </>
  )
}

export default Chats