import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { IconContext } from 'react-icons'
import { BsPersonVcardFill } from 'react-icons/bs'
import { RiChatSettingsLine } from 'react-icons/ri'
import { IoReturnDownBackOutline } from 'react-icons/io5'
import { FaEthereum } from 'react-icons/fa'
import { FiSend } from 'react-icons/fi'
import { MdOutlinePermMedia, MdPermMedia } from 'react-icons/md'
import ClipLoader from 'react-spinners/ClipLoader'
import SyncLoader from 'react-spinners/SyncLoader'
import io from 'socket.io-client'
import { chatState, useSnackbar } from '@context/index'
import { 
  getChatSender, 
  getChatSenderFull, 
  getChatSendersAddress
} from '@utils/chatLogics/getChatSender'
import { getFileFormat, isValidMediaType } from '@utils/computeFileProps'
// import { isYouTubeLink } from '@utils/isYoutubeUrl'
import { ScrollableChat } from '@components/miscellaneous/index'
import { SelectedMedia, GroupChatInfo, Profile } from '@components/widgets/index'
import ChatInfoModal from '@components/widgets/Modal'
// import MetaData from '@components/widgets/MetaData'
import { Input, Button } from '@components/elements/index'

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

  const router = useRouter()
  const { user, selectedChat, setSelectedChat, notification, setNotification } = chatState()
  const { showSnackbar } = useSnackbar()

  const [ fetchedMessages, setFetchedMessages ] = useState([])
  const [ newMessage, setNewMessage ] = useState('')
  const [ media, setMedia ] = useState('')
  const [ selectedFile, setSelectedFile ] = useState(null)
  const [ isLoading, setIsLoading ] = useState({
    sendButton: false, 
    chooseMedia: false, 
  })
  const [ isSpinner, setSpinner ] = useState(false)
  // -------socket-------
  const [ socket, setSocket ] = useState(null)
  const [ typing, setTyping] = useState(false)
  const [ isTyping, setIsTyping] = useState(false)
  // -------modal-------
  const [ isModalOpen, onModalClose ] = useState(false)

  const handleChatInfo = () => 
    onModalClose(false)

  const sendMessage = () => {
    socket.emit('typing stopped', selectedChat._id)
    
    if (newMessage.trim() === '' && !media) return

    setIsLoading(prevState => ({
      ...prevState, 
      sendButton: true
    }))

    return new Promise((resolve, reject) => {
      fetch('/api/message/', {
        method: 'POST',
        body: JSON.stringify({
          "content": newMessage, 
          "chat": selectedChat._id, 
          "media": media, 
          "contentType": getFileFormat(media) == '' ? '' : 'media', 
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': `Bearer ${user.token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        if(data.statusCode && [400, 500].includes(data.statusCode)) {
          showSnackbar({
            message: `Error ${data.statusCode}: ${data?.error}`, 
            severity: "error", 
          })
        } else if (data.statusCode === 201) {
          socket.emit("new message", data)
          setFetchedMessages([...fetchedMessages, data.message])
        }
        resolve(data)
      })
      .catch(error => {
        showSnackbar({
          message: `Error occurred while updating group chat name: ${error.message}`, 
          severity: "error", 
        })
        reject(error)
      })
      .finally(() => {
        setNewMessage('')
        setMedia('')
        setSelectedFile(null)
        setIsLoading(prevState => ({
          ...prevState, 
          sendButton: false
        }))
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
          showSnackbar({
            message: `Error ${data.statusCode}: ${data?.error}`, 
            severity: "error", 
          })
        } else if (data.statusCode === 200) {
          socket.emit("join chat", selectedChat._id)
          setFetchedMessages(data.messages)
        }
        resolve(data)
      })
      .catch(error => {
        showSnackbar({
          message: `Error occurred while updating users in group: ${error.message}`, 
          severity: "error", 
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
  
  const postDetails = (_media) => {
    setIsLoading(prevState => ({
      ...prevState, 
      chooseMedia: true
    }))
    if (_media === undefined) {
      showSnackbar({
        message: `no media selected !`, 
        severity: "warning", 
      })
      setIsLoading(prevState => ({
        ...prevState, 
        chooseMedia: false
      }))
      return
    }
    if (isValidMediaType(_media)) {
      setSelectedFile(_media)
      const folder = _media.type.startsWith('image') 
        ? 'images' 
        : (_media.type.startsWith('video') 
          ? 'videos' 
          : 'audios')
      const data = new FormData()
      data.append('file', _media)
      data.append('upload_preset', uploadPreset)
      data.append('cloud_name', cloudName)
      data.append('folder', folder)
      
      fetch('https://api.cloudinary.com/v1_1/'+ cloudName +'/upload', {
        method: 'post', 
        body: data, 
      })
      .then(response => response.json())
      .then(blob => {
        setMedia(blob.url.toString())
      })
      .catch((error) => {
        console.log(error)
        showSnackbar({
          message: "some error occurred while parsing", 
          severity: "warning", 
        })
        setSelectedFile(null)
      })
      .finally(() => {
        setIsLoading(prevState => ({
          ...prevState, 
          chooseMedia: false
        }))
      })
    } else {
      if(!selectedFile) {
        showSnackbar({
          message: `.${_media.type.split('/')[1]} is not valid media format !`, 
          severity: "warning", 
        })
      }
      setIsLoading(prevState => ({
        ...prevState, 
        chooseMedia: false
      }))
    }
  }
  const removeMedia = () => {
    setSelectedFile(null)
    setMedia('')
    /* @dev:: in future, code for removal of image uploaded to 
    cloudinary can be written below. */
  }
  const handlePayments = () => {
    const payeeAddress = (
      selectedChat.users[0]._id == user._id 
      ? selectedChat.users[1].address 
      : selectedChat.users[0].address
    )
    // console.log(payeeAddress)
    if(!payeeAddress) {
      showSnackbar({
        message: `ethereum wallet address unavailable`, 
        severity: 'info', 
      })
      return
    }
    router.push(`/payments/${payeeAddress}`)
  }
  // -------socket-------
  const handleTyping = (event) => {
    const inputValue = event.target.value
    setNewMessage(inputValue)

    if(!selectedChat || !socket) return

    if(!isTyping) {
      setTyping(true)
      /* response for below will be received by useEffect() (where setIsTyping(true) 
      is placed) via backend .in broadcast */
      socket.emit('typing', selectedChat._id)
    }

    const timerLength = 3000 // in milliseconds
    const timeoutId = setTimeout(() => {
        setTyping(false)
        socket.emit('typing stopped', selectedChat._id)
    }, timerLength)
    // clearing the timeout if in case the user starts typing again before it expires
    return () => clearTimeout(timeoutId)
  }
  useEffect(() => {
    setSelectedFile(null)
    setNewMessage('')
    setMedia('')
    setNotification((prevState) => (
      prevState.filter((notify) => (notify?._id !== selectedChat?._id))
    ))
  }, [selectedChat])
  // -------initializing socket connection-------
  useEffect(() => {
    const socketInitializer = async () => {
      await fetch('/api/socket')
      const newSocket = io()
      newSocket.emit("setup", user)
      newSocket.on("connected", () => {
        console.log('socket set back and forth')
        setSocket(newSocket)
      })
    }
    socketInitializer()
  }, [])

  useEffect(() => {
    if(!socket || !selectedChat) return
    
    fetchMesssages()
  }, [selectedChat, socket])

  useEffect(() => {
    /* socket would have been set by now as useEffect() executes 
    in the order of useEffect() hooks placed in code but since I had 
    to use selectedChat and so if selectedChat is not set yet so hook 
    should not get rendered rather when it gets set hook should execute 
    then only (such behavior has been ensured by adding in []) and then 
    since it also uses socket so its existence is ensured and placed in 
    dependency array both done to ensure good practice */
    if(!socket || !selectedChat) return

    socket.on('message received', (newReceivedMessage) => {
      if(selectedChat && (selectedChat?._id !== newReceivedMessage?.chat?._id)) {
        if(!notification.includes(newReceivedMessage)) {
          if(newReceivedMessage?.sender._id !== user?._id) {
            setNotification([newReceivedMessage, ...notification])
          }
          /* below function would, for a new sender it displays a new chat in MyChats, 
          for existing users it just simply topples the chat to top row */
          setFetchAgain(!fetchAgain)
        }
      } else {
        setFetchedMessages([...fetchedMessages, newReceivedMessage])
      }
    })
  }, [selectedChat, socket, fetchedMessages])

  useEffect(() => {
    if(!socket) return
    socket.on('typing-loader', (room) => {
      setIsTyping(true)
    })
    socket.on('typing-stopped', (room) => {
      setIsTyping(false)
    })
  }, [socket])
  
  return (
    <>
      <div className='w-full h-full bg-white bg-opacity-80 rounded-lg border-2 border-zinc-400'>
        {selectedChat ? (
          <div className='w-full h-full flex flex-col justify-between'>
            {/* upper strip div */}
            <div className='w-full h-fit bg-zinc-300 rounded-t-lg flex flex-row justify-between items-center py-2 px-3'>
              <Button 
                icon={IoReturnDownBackOutline} 
                type='alternative' 
                className='block md:hidden' 
                onClick={() => setSelectedChat(null)} 
                iconProps={{ color:"#CCCCCC", size:24 }}
              />
              <p className='text-sm sm:text-xl font-bold mx-2'>
                {!selectedChat?.isGroupChat ? (
                  getChatSender(selectedChat.users)
                ) : selectedChat.chatName} </p>
              <div className='flex gap-2'>
                {!selectedChat?.isGroupChat && (
                  <Button
                    icon={FaEthereum} 
                    type='alternative' 
                    onClick={handlePayments} 
                    iconProps={{ color:"#CCCCCC", size:24 }} />
                )}
                <Button 
                  icon={!selectedChat?.isGroupChat ? BsPersonVcardFill : RiChatSettingsLine} 
                  type='alternative' 
                  onClick={() => onModalClose(true)} 
                  iconProps={{ color:"#CCCCCC", size:24 }} />
              </div>
            </div>
            {/* display area for message */}
            <ScrollableChat 
              fetchedMessages={fetchedMessages} 
              isSpinner={isSpinner} />

            <div className='relative'>
              {/* display area for selected file */}
              <div className='absolute bottom-16 left-2'>
                {selectedFile && (
                  <SelectedMedia 
                    selectedFile={selectedFile} 
                    onClick={removeMedia} 
                    isLoading={isLoading} />
                )}
              </div>
              {/* {isYouTubeLink(newMessage) && (
                <MetaData url="https://www.youtube.com/watch?v=GxCXiSkm6no" />
              )} */}
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
                  <label 
                    htmlFor="file-upload" 
                    className='text-white bg-slate-800 p-2 rounded-lg cursor-pointer w-10 h-10 flex justify-center items-center mr-1'>
                      {selectedFile 
                      ? (<IconContext.Provider value={{ color: 'white', className: 'text-lg' }}>
                          <MdPermMedia /> 
                        </IconContext.Provider> )
                      : (<IconContext.Provider value={{ color: 'white', className: 'text-lg' }}>
                          <MdOutlinePermMedia />
                        </IconContext.Provider> )}
                  </label>
                  <Input 
                    type='file'
                    id="file-upload"
                    accept= 'image/*, video/*, audio/*'
                    onChange = {e => postDetails(e.target.files[0])}
                    className='hidden' />
                  <Input 
                    id='send-message-id' 
                    type="text" 
                    placeholder='type your message' 
                    autoFocus={true} 
                    value={newMessage} 
                    onChange={handleTyping} 
                    onKeyPress={handleKeyPress} 
                    coverClass='w-full my-0 rounded-r-none' 
                    style={{ borderRadius: '0.5rem 0 0 0.5rem' }} />
                  <Button 
                    type="default" 
                    onClick={sendMessage} 
                    icon={!isLoading.sendButton ? FiSend : ClipLoader}
                    iconProps={{
                      color: "white", 
                      loading: isLoading.sendButton ? "true" : "false", 
                      size: 20
                    }}
                    className={`h-full rounded-l-none ${isLoading.chooseMedia && 'cursor-wait'}`}
                    disabled={isLoading.chooseMedia} />
                </div>
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
          w='w-11/12 h-3/6 md:w-8/12 md:h-4/6 lg:w-4/12 lg:h-3/6' 
          closeIcon={true}
        >
          <Profile 
            user={getChatSenderFull(selectedChat?.users)} 
            alt={`${getChatSender(selectedChat?.users)}'s profile pic`} />
        </ChatInfoModal>
      : 
        <ChatInfoModal 
          onClose={handleChatInfo} 
          modalOverlay={true} 
          w='w-11/12 md:w-8/12 lg:w-5/12' 
          h='h-[92%] sm:5/6' 
          className='px-0 md:px-8'
          closeIcon={false}
        >
          <GroupChatInfo 
            chatGroup={selectedChat} 
            fetchAgain={fetchAgain} 
            setFetchAgain={setFetchAgain} />
        </ChatInfoModal>
      )}
    </>
  )
}

export default ChatBox