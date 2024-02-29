import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { FaPlus } from 'react-icons/fa'
import { chatState } from '../context/ChatProvider'
import { useSnackbar } from '../context/SnackbarToast'
import { removeUserInfoAndRedirect } from '../utils/removeUserInfoAndRedirect'
import ChatLoading from './widgets/ChatLoading'
import GroupChatForm from './widgets/modal/GroupChatForm'
import GroupChatModal from './widgets/Modal'
import ChatListItem from './elements/list/ChatListItem'

const MyChats = ({ fetchAgain }) => {
  const router = useRouter()
  const { user, chats, setChats, selectedChat, setSelectedChat } = chatState()
  const { showSnackbar } = useSnackbar()
  const [ loading, setLoading ] = useState(false)

  // -------Modal-------
  const [ isModalOpen, onModalClose ] = useState(false)

  const handleGroupChatModal = () => 
    onModalClose(false)

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
        showSnackbar({
          message: `Error Occurred: ${response.statusText}`, 
          severity: "error", 
        })
        removeUserInfoAndRedirect(router)
        throw new Error(response.statusText)
      }
      return response.json() // return the promise
    })
    .then(data => {
      if (data.statusCode !== 200) {
        showSnackbar({
          message: data.error, 
          severity: "error", 
        })
      } else {
        setChats(data.data)
      }
      setLoading(false)
    })
    .catch(error => {
      // console.error('error while fetching chats or winding up response: ' , error)
      showSnackbar({
        message: "Error Occurred: failed to load chats !", 
        severity: "error", 
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
          <p className='text-lg md:text-xl font-bold text-gray-800'> My Chats </p>
          <button 
            type="button" 
            className="h-fit w-fit py-1.5 px-2 md:py-2.5 md:px-4 me-2 text-xs md:text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
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
          w='w-11/12 md:w-8/12 lg:w-5/12' 
          h='h-5/6' 
          className='px-0 md:px-8 flex flex-col justify-start items-center gap-5' 
          // closeIcon={true} 
        >
          <GroupChatForm onClose={handleGroupChatModal} />
        </GroupChatModal>
      )}
    </>
  )
}

export default MyChats