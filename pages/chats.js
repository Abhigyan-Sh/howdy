import { chatState } from '../context/ChatProvider';
import SideDrawer from '../components/miscellaneous/SideDrawer';
import MyChats from '../components/MyChats';
import ChatBox from '../components/ChatBox';

const Chats = () => {
  const { user, setUser } = chatState();
  // console.log(user);
  return (
    <div style={{ backgroundColor : "blue", width: "100%" }}>
      {user && <SideDrawer/>}
      {user && <MyChats/>}
      {user && <ChatBox/>}
    </div>
  )
}
export default Chats;