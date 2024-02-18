import React, { useState, useEffect } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useRouter } from 'next/router'
import { chatState } from '../context/ChatProvider'
import { removeUserInfoAndRedirect } from '../utils/removeUserInfoAndRedirect'
import ChatLoading from './widgets/ChatLoading'
import SnackbarToast, { setToastVisible }  from './widgets/SnackbarToast'
import ChatListItem from './elements/list/ChatListItem'
import GroupChatModal from '../components/widgets/Modal'
import GroupChatForm from '../components/widgets/modal/GroupChatForm'

const MyChats = ({ fetchAgain }) => {
  const router = useRouter()
  const { user, chats, setChats, selectedChat, setSelectedChat } = chatState()
  const [ loading, setLoading ] = useState(false)

  // -------Modal-------
  const [ isModalOpen, onModalClose ] = useState(false)

  const handleGroupChatModal = () => 
    onModalClose(false)

  // -------Toast-------
  const [ message, setMessage ] = useState('')
  const [ severity, setSeverity ] = useState('')
  const [ isToastOpen, onToastClose ] = useState(false)
  
  const handleToast = () => {
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
        removeUserInfoAndRedirect(router)
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
          <button 
            type="button" 
            className="h-fit w-fit py-2.5 px-5 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={() => onModalClose(true)}>
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
                selectedItem={selectedChat}
                chat={chat}
                onClick={() => setSelectedChat(chat)} />
            ))}
        </div>
      </div>
      {/* -------GroupChatModal------- */}
      {isModalOpen && (
        <GroupChatModal 
          onClose={handleGroupChatModal} 
          header="Create Group Chat" 
          modalOverlay={true} 
          w='w-5/12' 
          h='h-5/6' 
          px='px-8'
        >
          <GroupChatForm onClose={handleGroupChatModal} />
        </GroupChatModal>
      )}
      {/* -------toast------- */}
      <SnackbarToast 
        // key={"key-00"} 
        message={message} 
        open={isToastOpen} 
        onClose={handleToast} 
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