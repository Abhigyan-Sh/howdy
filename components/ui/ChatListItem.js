import React from 'react'
import { getChatSender } from '../../utils/getChatSender'

const ChatListItem = ({ key_prop, chat, onClick }) => {
  return (
    <button 
      key={key_prop}
      className='bg-zinc-300 w-full rounded-lg p-2 px-4 flex flex-col my-2'
      onClick={onClick}
    >
      <p className='font-bold'>
        {!chat.isGroupChat 
          ? getChatSender(chat.users) 
          : chat?.chatName} </p>
      {chat?.latestMessage && (
        <div className='flex items-start gap-1 text-zinc-600'>
          <p>{chat.latestMessage?.sender?.username}: {chat.latestMessage?.content}</p>
        </div>
      )}
    </button>
  )
}

export default ChatListItem