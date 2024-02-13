import React from 'react'
import { getChatSender } from '../../utils/getChatSender'

const ChatListItem = ({ key_prop, chat, onClick, selectedItem }) => {
  return (
    <button 
      key={key_prop}
      className={`w-full rounded-lg p-2 px-4 flex flex-col my-2 ${(selectedItem?._id === chat?._id) ? "bg-slate-900 text-zinc-300" : "bg-zinc-300 text-slate-900"}`}
      onClick={onClick}
    >
      <p className='font-bold'>
        {!chat.isGroupChat 
          ? getChatSender(chat.users) 
          : chat?.chatName} </p>
      {chat?.latestMessage && (
        <div className='flex items-start gap-1 text-zinc-600'>
          {!chat.isGroupChat 
          ? <p>{chat.latestMessage?.content && chat.latestMessage.content.length > 40 
            ? chat.latestMessage.content.substring(0, 40) + '...' 
            : chat.latestMessage?.content}</p>
          : <p>{chat.latestMessage?.sender?.username}: {chat.latestMessage?.content && chat.latestMessage.content.length > 40 
            ? chat.latestMessage.content.substring(0, 40) + '...' 
            : chat.latestMessage?.content}</p>}
        </div>
      )}
    </button>
  )
}

export default ChatListItem