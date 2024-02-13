import React, { useState, useEffect } from 'react'
import { FaPlus } from 'react-icons/fa'
import { chatState } from '../context/ChatProvider'
import ChatLoading from './ui/ChatLoading'
import SnackbarToast, { setToastVisible }  from './ui/SnackbarToast'
import ChatListItem from './ui/ChatListItem'

const MyChats = ({ fetchAgain }) => {
  const { user, chats, setChats, selectedChat, setSelectedChat } = chatState()
  // @dev:: is there any use of setLoading ??
  // @dev:: selected chat should have a changed appearance
  const [ loading, setLoading ] = useState(false)

  // -------Toast-------
  const [ message, setMessage ] = useState('')
  const [ severity, setSeverity ] = useState('')
  const [ isToastOpen, onToastClose ] = useState(false)
  
  const handleClose = () => {
    onToastClose(false)
  }
  // -------Fetch Chats-------
  const fetchChats = () => {
    setLoading(true)
    fetch('/api/chat/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        setToastVisible({
          _message: `Error Occurred: ${response.statusText}`, 
          _severity: "error", 
          setMessage: setMessage, 
          setSeverity: setSeverity, 
          onOpen: onToastClose
        })
        throw new Error(response.statusText)
      }
      return response.json() // return the promise
    })
    .then(data => {
      if (data.statusCode !== 200) {
        setToastVisible({
          _message: data.error, 
          _severity: "error", 
          setMessage: setMessage, 
          setSeverity: setSeverity, 
          onOpen: onToastClose
        })
      } else {
        setChats(data.data)
      }
      setLoading(false)
    })
    .catch(error => {
      // console.error('error while fetching chats or winding up response: ' , error)
      setToastVisible({
        _message: "Error Occurred: failed to load chats !", 
        _severity: "error", 
        setMessage: setMessage, 
        setSeverity: setSeverity, 
        onOpen: onToastClose
      })
      setLoading(false)
    })
  }
  useEffect(() => {
    fetchChats()
  }, [fetchAgain])
  return (
    <>
      <div className='w-full h-full p-4 bg-white bg-opacity-80 rounded-lg border-2 border-zinc-400'>
        <div className='p-2 flex flex-row justify-between items-center rounded-lg bg-zinc-300 mb-4'>
          <p className='text-xl font-bold text-gray-800'> My Chats </p>
          <button type="button" className="h-fit w-fit py-2.5 px-5 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
            <div className='flex flex-row items-center justify-between gap-2'>
              <p> New Group Chat </p> <FaPlus />
            </div>
          </button>
        </div>
        <div className='h-5/6 overflow-auto no-scrollbar'>
          {loading 
            ? <ChatLoading count={7} /> 
            : chats?.map((chat, index) => (
              <ChatListItem 
                key={chat._id} 
                key_prop={chat._id} 
                chat={chat}
                onClick={() => setSelectedChat(chat)} />
            ))}
        </div>
      </div>
      {/* -------toast------- */}
      <SnackbarToast 
        // key={"key-00"} 
        message={message} 
        open={isToastOpen} 
        onClose={handleClose} 
        transition="SlideTransition" 
        delay={5000} 
        vertical="bottom" 
        horizontal="center" 
        severity={severity} 
        variant="filled"
        sx={{ width: '100%' }} 
        actionNumber={1} 
      />
    </>
  )
}

export default MyChats