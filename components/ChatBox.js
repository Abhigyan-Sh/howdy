import React, { useState } from 'react'
import Image from 'next/image'
import { BsPersonVcardFill } from 'react-icons/bs'
import { RiChatSettingsLine } from 'react-icons/ri'
import { chatState } from '../context/ChatProvider'
import { getChatSender, getChatSenderFull } from '../utils/getChatSender'
import Button from '../components/Button'
import ChatInfoModal from './widgets/Modal'
import Profile from './widgets/Profile'
import GroupChatInfo from './widgets/GroupChatInfo'

const ChatBox = ( { fetchAgain, setFetchAgain } ) => {
  const { user, selectedChat } = chatState()

  // -------Modal-------
  const [ isModalOpen, onModalClose ] = useState(false)

  const handleChatInfo = () => 
    onModalClose(false)

  return (
    <>
      <div className='w-full h-full bg-white bg-opacity-80 rounded-lg border-2 border-zinc-400'>
        {selectedChat ? (
          <>
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
            <div></div>
          </>
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
    </>
  )
}

export default ChatBox