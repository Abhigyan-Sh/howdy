import React, { useState } from 'react'
import Image from 'next/image'
import { BsPersonVcardFill } from 'react-icons/bs'
import { RiChatSettingsLine } from 'react-icons/ri'
import { FiSend } from "react-icons/fi"
import ClipLoader from 'react-spinners/ClipLoader'
import { chatState } from '../context/ChatProvider'
import { getChatSender, getChatSenderFull } from '../utils/getChatSender'
import SnackbarToast, { setToastVisible }  from '../components/ui/SnackbarToast'
import ScrollableChat from '../components/ScrollableChat'
import Input from '../components/InputField/Input'
import Button from '../components/Button'
import ChatInfoModal from './widgets/Modal'
import Profile from './widgets/Profile'
import GroupChatInfo from './widgets/GroupChatInfo'

const ChatBox = ( { fetchAgain, setFetchAgain } ) => {
  const { user, selectedChat } = chatState()
  const [ fetchedMessages, setFetchedMessages ] = useState([])
  const [ newMessage, setNewMessage ] = useState('')
  const [ isLoading, setIsLoading ] = useState(false)
  // -------modal-------
  const [ isModalOpen, onModalClose ] = useState(false)
  // -------toast-------
  const [ toastMessage, setToastMessage ] = useState('')
  const [ severity, setSeverity ] = useState('')
  const [ isToastOpen, onToastClose ] = useState(false)

  const handleChatInfo = () => 
    onModalClose(false)

  const handleToast = () => {
    onToastClose(false)
  }

  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      setNewMessage('')
    }
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
          setFetchedMessages([...fetchedMessages, data.message])
        }
        resolve(data)
      })
      .catch(error => {
        setToastVisible({
          _message: `Error occurred while updating group chat name: ${error.message}`, 
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
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') 
      sendMessage()
  }
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
            {/* lower strip div */}
            <ScrollableChat 
              fetchedMessages={fetchedMessages} 
              setFetchedMessages={setFetchedMessages}
              setToastMessage={setToastMessage}
              setSeverity={setSeverity}
              onToastClose={onToastClose} />
            <div className='w-full flex flex-row justify-between border-2 rounded-lg border-y-teal-700'>
              <Input 
                id='send-message-id' 
                type="text" 
                placeholder='type your message' 
                autoFocus={true} 
                value={newMessage} 
                onChange={(e) => {setNewMessage(e.target.value)}} 
                onKeyPress={handleKeyPress}
                coverClass='w-full my-0 rounded-r-none' />
              <Button 
                type="default" 
                onClick={sendMessage} 
                icon={!isLoading ? FiSend : ClipLoader}
                iconProps={{
                  color: "white", 
                  loading: isLoading, 
                  size: 20
                }}
                className='h-full rounded-l-none' />
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