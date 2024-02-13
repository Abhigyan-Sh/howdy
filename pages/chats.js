import Image from 'next/image'
import { chatState } from '../context/ChatProvider'
import Navbar from '../components/layout/Navbar'
import MyChats from '../components/MyChats'
import ChatBox from '../components/ChatBox'

const Chats = () => {
  const { user } = chatState()

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
          quality={100} 
          className="z-0" // ensure the background image is behind other content
        />
        {/* -------Optional: Overlay for background image------- */}
        <div className='absolute inset-0 bg-opacity-50 bg-gray-800'></div>
        {/* Other content: Chats */}
        <div className='w-full h-full flex flex-row items-center justify-between bg-transparent relative'>
          <div className='w-4/12 h-full flex flex-row items-center justify-center p-4 pr-2'>
            {user && <MyChats/>}
          </div>
          <div className='w-8/12 h-full flex flex-row items-center justify-center p-4 pl-2'>
            {user && <ChatBox/>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chats