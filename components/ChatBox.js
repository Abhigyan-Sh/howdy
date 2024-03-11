import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { BsPersonVcardFill } from 'react-icons/bs'
import { RiChatSettingsLine } from 'react-icons/ri'
import { FiSend } from "react-icons/fi"
import ClipLoader from 'react-spinners/ClipLoader'
import SyncLoader from 'react-spinners/SyncLoader'
import io from 'socket.io-client'
import { chatState } from '../context/ChatProvider'
import { getChatSender, getChatSenderFull } from '../utils/getChatSender'
import SnackbarToast, { setToastVisible }  from '../components/widgets/SnackbarToast'
import ScrollableChat from './miscellaneous/ScrollableChat'
import Input from './elements/Input'
import Button from './elements/Button'
import ChatInfoModal from './widgets/Modal'
import Profile from './widgets/modal/Profile'
import GroupChatInfo from './widgets/modal/GroupChatInfo'

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, notification, setNotification } = chatState()
  const [ fetchedMessages, setFetchedMessages ] = useState([])
  const [ newMessage, setNewMessage ] = useState('')
  const [ isLoading, setIsLoading ] = useState(false)
  const [ isSpinner, setSpinner ] = useState(false)
  // -------socket-------
  const [ socket, setSocket ] = useState(null)
  const [ typing, setTyping] = useState(false)
  const [ isTyping, setIsTyping] = useState(false)
  // -------modal-------
  const [ isModalOpen, onModalClose ] = useState(false)
  // -------toast-------
  const [ toastMessage, setToastMessage ] = useState('')
  const [ severity, setSeverity ] = useState('')
  const [ isToastOpen, onToastClose ] = useState(false)

  const handleChatInfo = () => 
    onModalClose(false)

  const handleToast = () => 
    onToastClose(false)

  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      setNewMessage('')
    }
    socket.emit('typing stopped', selectedChat._id)
    setIsLoading(true)

    return new Promise((resolve, reject) => {
      fetch('/api/message/', {
        method: 'POST',
        body: JSON.stringify({
          "content": newMessage, 
          "chat": selectedChat._id
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': `Bearer ${user.token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        if(data.statusCode && [400, 500].includes(data.statusCode)) {
          setToastVisible({
            _message: `Error ${data.statusCode}: ${data?.error}`, 
            _severity: "error", 
            setMessage: setToastMessage, 
            setSeverity: setSeverity, 
            onOpen: onToastClose
          })
        } else if (data.statusCode === 201) {
          socket.emit("new message", data)
          setFetchedMessages([...fetchedMessages, data.message])
        }
        resolve(data)
      })
      .catch(error => {
        setToastVisible({
          _message: `Error occurred while sending message: ${error.message}`, 
          _severity: "error", 
          setMessage: setToastMessage, 
          setSeverity: setSeverity, 
          onOpen: onToastClose
        })
        reject(error)
      })
      .finally(() => {
        setNewMessage('')
        setIsLoading(false)
      })
    })
  }

  const fetchMesssages = async() => {
    setSpinner(true)
    return new Promise((resolve, reject) => {
      fetch(`/api/message/${selectedChat._id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
      .then(response => response.json())
      .then(data => {
        if(data.statusCode && [400, 404, 405, 500].includes(data.statusCode)) {
          setToastVisible({
            _message: `Error ${data.statusCode}: ${data?.error}`, 
            _severity: "error", 
            setMessage: setToastMessage, 
            setSeverity: setSeverity, 
            onOpen: onToastClose
          })
        } else if (data.statusCode === 200) {
          socket.emit("join chat", selectedChat._id)
          setFetchedMessages(data.messages)
        }
        resolve(data)
      })
      .catch(error => {
        setToastVisible({
          _message: `Error occurred while updating users in group: ${error.message}`, 
          _severity: "error", 
          setMessage: setToastMessage, 
          setSeverity: setSeverity, 
          onOpen: onToastClose
        })
        reject(error)
      })
      .finally(() => {
        setSpinner(false)
      })
    })
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') 
      sendMessage()
  }
  // -------socket-------
  const handleTyping = (event) => {
    setNewMessage(event.target.value)

    if(!selectedChat || !socket) return

    if(!isTyping) {
      setTyping(true)
      /* response for below will be received by useEffect() (where setIsTyping(true) 
      is placed) via backend .in broadcast */
      socket.emit('typing', selectedChat._id)
    }
    let lastTypingTime = new Date().getTime()
    let timerLength = 3000

    setTimeout(() => {
      let timeNow = new Date().getTime()
      let timePassed = timeNow - lastTypingTime
      if((timePassed >= timerLength) && typing) {
        socket.emit('typing stopped', selectedChat._id)
        setTyping(false)
      }
    }, timerLength)
  }
  useEffect(() => {
    const socketInitializer = async () => {
      await fetch('/api/socket')
      const newSocket = io()
      newSocket.emit("setup", user)
      newSocket.on("connected", () => {
        console.log('working back and forth !!')
        setSocket(newSocket)
      })
    }
    socketInitializer()
  }, [])

  useEffect(() => {
    if(socket && selectedChat) 
      fetchMesssages()
  }, [selectedChat, socket])

  useEffect(() => {
    if(socket && selectedChat) {
      socket.on('message received', (newReceivedMessage) => {
        if(selectedChat && (selectedChat._id !== newReceivedMessage.chat._id)) {
          if(!notification.includes(newReceivedMessage)) {
            setNotification([newReceivedMessage, ...notification])
            /* for a new sender it displays a new chat in MyChats, 
            for existing users it just simply topples the chat to top row */
            setFetchAgain(!fetchAgain)
          }
        } else {
          setFetchedMessages([...fetchedMessages, newReceivedMessage])
        }
      })
    }
  }, [selectedChat, socket])

  useEffect(() => {
    if(!socket) return
    socket.on('typing', () => {
      setIsTyping(true)
    })
    socket.on('typing stopped', () => {
      setIsTyping(false)
    })
  }, [])
  
  return (
    <>
      <div className='w-full h-full bg-white bg-opacity-80 rounded-lg border-2 border-zinc-400'>
        {selectedChat ? (
          <div className='w-full h-full flex flex-col justify-between'>
            {/* upper strip div */}
            <div className='w-full h-fit bg-zinc-300 rounded-t-lg flex flex-row justify-between items-center py-2 px-3'>
              <p className='text-xl font-bold '>
                {!selectedChat?.isGroupChat ? (
                  getChatSender(selectedChat.users)
                ) : selectedChat.chatName} </p>
              <Button 
                icon={!selectedChat?.isGroupChat ? BsPersonVcardFill : RiChatSettingsLine} 
                type='alternative' 
                className='px-1 py-1 bg-zinc-500 dark:bg-zinc-500' 
                onClick={() => onModalClose(true)} 
                iconProps={{ color:"#CCCCCC", size:24 }} />
            </div>
            {/* message display area */}
            <ScrollableChat 
              fetchedMessages={fetchedMessages} 
              isSpinner={isSpinner} />
            {/* Input area */}
            <div className='flex flex-col m-2'>
              {isTyping && (
                <div className='pb-2 pl-1'>
                  <SyncLoader
                    color="#0F172A"
                    margin={2}
                    size={5}
                    speedMultiplier={0.6} />
                </div>
              )}
              <div className='w-full flex flex-row justify-between border-2 rounded-lg border-y-teal-700'>
                <Input 
                  id='send-message-id' 
                  type="text" 
                  placeholder='type your message' 
                  autoFocus={true} 
                  value={newMessage} 
                  onChange={handleTyping} 
                  onKeyPress={handleKeyPress} 
                  coverClass='w-full my-0 rounded-r-none' />
                <Button 
                  type="default" 
                  onClick={sendMessage} 
                  icon={!isLoading ? FiSend : ClipLoader}
                  iconProps={{
                    color: "white", 
                    loading: isLoading ? "true" : "false", 
                    size: 20
                  }}
                  className='h-full rounded-l-none' />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full w-full">
            <Image 
              src="/assets/chat.png" 
              alt="chat logo"
              width={125}
              height={125} />
            <p className="text-gray-500">Select a chat to display</p>
          </div>
        )}
      </div>
      {/* -------Profile Modal | GroupInfoModal------- */}
      {isModalOpen && (!selectedChat?.isGroupChat 
      ? <ChatInfoModal 
          onClose={handleChatInfo} 
          modalOverlay={true} 
          w='w-4/12' 
        >
          <Profile 
            user={getChatSenderFull(selectedChat?.users)} 
            alt={`${getChatSender(selectedChat?.users)}'s profile pic`} />
        </ChatInfoModal>
      : 
        <ChatInfoModal 
          onClose={handleChatInfo} 
          modalOverlay={true} 
          w='w-4/12' 
          // h='h-5/6' 
          // px='px-8'
        >
          <GroupChatInfo 
            chatGroup={selectedChat} 
            fetchAgain={fetchAgain} 
            setFetchAgain={setFetchAgain} />
        </ChatInfoModal>
      )}
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

export default ChatBox