import React from 'react'
import { getChatSender } from '@utils/chatLogics/getChatSender'
import { formatUpdatedAt } from '@utils/mongoDB/formatUpdatedAt'
import { truncateFileName } from '@utils/truncateFileName'

const NotificationItem = ({ notify }) => {
  console.log(notify)
  return (
    <div>
      <div className='relative text-xs text-slate-800'>
        <p className='absolute -top-3 -left-7 font-bold bg-white border-2 border-zinc-400 px-[4px] py-[0.5px] rounded-lg'>
          {!notify?.isGroupChat 
            ? getChatSender(notify?.users)
            : notify?.chatName + '/' + notify?.latestMessage?.sender?.username}
        </p>
        <p className='text-sm pt-2'>
          {truncateFileName(notify?.latestMessage.content, 14)}
        </p>
        <p className='w-fit float-end text-[10px]'>
          {formatUpdatedAt(notify?.latestMessage.createdAt)}
        </p>
      </div>
    </div>
  )
}

export default NotificationItem