import { chatState } from '../context/ChatProvider'
import Navbar from '../components/miscellaneous/Navbar'
import MyChats from '../components/MyChats'
import ChatBox from '../components/ChatBox'

const Chats = () => {
  const { user, setUser } = chatState()
  // console.log(user)
  return (
    <div className="relative w-full h-screen">
      {user && <Navbar/>}
      <div className="flex flex-row h-full">
        {user && <MyChats/>}
        {user && <ChatBox/>}
      </div>
    </div>
  )
}

export default Chats