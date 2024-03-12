import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { IoCheckmarkDoneOutline } from 'react-icons/io5'
import { formatUpdatedAt } from '@utils/mongoDB/formatUpdatedAt'
import { 
  getFileFormat, 
  validVideoFormats, 
  validImageFormats, 
  validAudioFormats 
} from '@utils/computeFileProps'
import { readBy } from '@utils/chatLogics/readBy'
import { isSentByLoggedInUser } from '@utils/chatLogics/senderIs'
import { truncateFileName } from '@utils/truncateFileName'
import { NextCloudPlayer, NextCloudImg, AudioPlayer } from '@components/widgets/index'
import Avatar from '@components/ui/Avatar'

const Message = ({ 
  message, 
  alt, 
  className, 
  isConsecutiveSender, 
  isSentByLoggedInUser 
}) => {
  const mediaFormatExtension = getFileFormat(message.media)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }
  const getSeenBy = () => {
  }

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='flex items-start gap-2.5'>
    {/* LEFT */}
    {(!isSentByLoggedInUser && !isConsecutiveSender) ? (
      <Image 
        height={32} 
        width={32} 
        className='rounded-full' 
        src={message.sender.pic} 
        alt={alt} />
    ) : (
      <div className='w-12'></div>
    )}
    {/* MIDDLE */}
    <div className='flex flex-col gap-1 w-full'>
      {!isSentByLoggedInUser && !isConsecutiveSender && (
        <span className='text-sm font-semibold text-gray-900'>
          {message.sender.username}</span>
      )}

      {/* MESSAGE SECTION: content, payment || contract(wont' include content) || media || web-scrapping */}
      <div className={`flex flex-col leading-1.5 p-4 border-gray-200 ${isSentByLoggedInUser ? 'bg-emerald-700 dark:bg-emerald-700 rounded-s-xl rounded-ee-xl' : 'bg-gray-100 dark:bg-gray-700 rounded-e-xl rounded-es-xl'} ${className}`}>
        {/* 1) display media */}
        {validVideoFormats.includes(
          mediaFormatExtension 
        ) && (
          <NextCloudPlayer src={message.media} />
        )}
        {validImageFormats.includes(
          mediaFormatExtension 
        ) && (
          <NextCloudImg src={message.media} />
        )}
        {validAudioFormats.includes(
          mediaFormatExtension 
        ) && (
          <AudioPlayer src={message.media} />
        )}
        {/* 2) display message content */}
        {message.content && (
          <div className='mt-2'>
            <p className='text-sm md:text-[16px] font-normal text-gray-900 dark:text-white'> 
              {message.content}</p> 
          </div> )}
      </div>

      <div className='flex items-center justify-between mx-2 space-x-2 rtl:space-x-reverse text-xs'>
        {isSentByLoggedInUser && (
          message?.chat?.isGroupChat 
          ? (
          <IoCheckmarkDoneOutline className={`w-4 h-4 rounded-full font-normal text-lg ${
            readBy(message) ? 'text-sky-500' : 'text-slate-800'}`} 
          />) 
          : readBy(message) && (
          <Avatar 
            src={message?.sender?.pic} 
            width={16} 
            height={16} 
            alt='user profile pic' 
          />)
        )}
        <span className='font-normal text-gray-500'>
          {formatUpdatedAt(message.updatedAt)}</span>
        
        {/* read By button */}
        {isSentByLoggedInUser && message.chat.isGroupChat && (
          <div className='relative' ref={dropdownRef}>
            <button
              id='dropdownMenuIconButton'
              onClick={() => {
                toggleDropdown()
                getSeenBy()
              }}
              className='inline-flex self-center items-center p-1 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600'
              type='button'
            >
              <svg
                className='w-2 h-2 text-gray-500 dark:text-gray-400'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 4 15'
              >
                <path d='M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z' />
              </svg>
            </button>
      
            {/* Dropdown content */}
            {isOpen && (
              <div className='absolute text-white w-32 rounded-lg divide-y-2 divide-dashed right-0 top-15 bg-slate-200 shadow-lg dark:bg-gray-800'>
                {message?.readBy?.map((user, index) => (
                  <div key={index} className='p-2 flex justify-start items-center gap-1'>
                    <Avatar 
                      src={user.pic} 
                      width={22} 
                      height={22} 
                      alt='user profile pic'
                      className_ring='border-2' />
                    <p>{truncateFileName(user?.username, 15)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  </div>
  )
}

export default Message