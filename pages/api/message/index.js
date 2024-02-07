import AuthMiddleware from '../../../middlewares/authMiddleware'
import connectToMongoDB from '../../../utils/connectMongo'
import Message from '../../../models/messages'
import User from '../../../models/users'
import Chat from '../../../models/chats'

const sendMessage = async (req, res) => {
  connectToMongoDB()
  const { method, body } = req
  const { content, chat } = body
  /* first chatId is created (by clicking on user from search or creating group) 
  then this chatId is taken to fetch(hence only messages belonging to that 
  channel are taken-out from DB) or create messages(each message will have 
  chatId, chatId which is unique to a channel or group) */
  if(method === 'POST') {
    try {
      if (!content || !chat) {
        return res.status(400).send('Invalid request')
      }
      // send the message to database
      const message = await Message.create({
        sender: req.user._id,
        content, 
        chat
      })
      /* @dev:: whats happening in code below ??
      although construct fullMessage (message + username + pic) and display it in chat 
      of user who sent it but also update the Chat collection for latestMessage */ 
      let fullMessage = await Message.findById(message._id)
        .populate('chat')
        // .populate('chat', 'users')
      fullMessage = await User.populate(fullMessage, {
        path: 'chat.users',
        select: 'username pic'
      })
      await Chat.findByIdAndUpdate(chat, { latestMessage: fullMessage })
      res.status(201).send(fullMessage)
    } catch(error) {
      res.status(500)
        .send(error.message)
    }
  }
}

export default AuthMiddleware(sendMessage)