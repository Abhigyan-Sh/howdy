import { useState } from 'react'
import Image from 'next/image'
import { chatState } from '../context/ChatProvider'
import Navbar from '../components/layout/Navbar'
import MyChats from '../components/MyChats'
import ChatBox from '../components/ChatBox'

const Chats = () => {
  const { user, selectedChat } = chatState()
  /* @dev:: value is made to toggle between true and false where a  
  toggle indicates that chats need to be fetched again from database */
  const [ fetchAgain, setFetchAgain ] = useState(false)
  
  return (
    <div className="relative w-full h-screen overflow-auto no-scrollbar">
      {user && <Navbar/>}
      <div className='w-full h-[91.5vh] relative'>
        {/* -------background image------- */}
        <Image
          src="/assets/backgroundWallpaper.jpg" 
          alt="Background Image" 
          layout="fill" // fill entire parent container
          objectFit="cover" // cover entire parent container
          quality={60} 
          className="z-0" // ensure the background image is behind other content
          loading="lazy" 
        />
        {/* -------Optional: Overlay for background image------- */}
        <div className='absolute inset-0 bg-opacity-50 bg-gray-800'></div>
        {/* Other content: Chats */}
        <div className='w-full h-full flex flex-row items-center justify-between bg-transparent relative'>
          <div className={`h-full ${selectedChat ? 'hidden' : 'w-full'} md:w-4/12 md:flex flex-row items-center justify-center p-4 pr-2`}>
            {user && <MyChats fetchAgain={fetchAgain} />}
          </div>
          <div className={`h-full ${selectedChat ? 'w-full' : 'hidden'} md:w-8/12 md:flex flex-row items-center justify-center p-4 pl-2`}>
            {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chats