import { chatState } from '../context/ChatProvider';
import { Box } from '@chakra-ui/react';
import SideDrawer from '../components/miscellaneous/SideDrawer';
import MyChats from '../components/MyChats';
import ChatBox from '../components/ChatBox';

const Chats = () => {
  const { user, setUser } = chatState();
  // console.log(user);
  return (
    <div style={{ backgroundColor : "blue", width: "100%" }}>
      {user && <SideDrawer/>}
      <Box
        display= "flex"
        justifyContent= "space-between"
        w= "100%"
        h= "91.5vh"
        p= "10px">
          {user && <MyChats/>}
          {user && <ChatBox/>}
      </Box>
    </div>
  )
}
export default Chats;