import Chat from '../../../models/chats'
import User from '../../../models/users'
import AuthMiddleware from '../../../middlewares/authMiddleware'
import connectToMongoDB from '../../../utils/connectMongo'

const GetChats = (req, res) => {
  const { method } = req
  if (method === 'POST') accessChat(req, res)
  if (method === 'GET') fetchChats(req, res)
}

/* Action: searched for a user and then clicked on that user now a chat 
has to be displayed having this user's userId and current logged in user's 
id but if not there already then create a new chat */ 
const accessChat = async (req, res) => {
  // connectToMongoDB()
  const { method, body } = req
  const { userId } = body
  /* @dev:::userId comes from what chat has been clicked 
  on left side results from search bar */
  if (!userId) {
    return res.status(400).json({
      status: 'error',
      message: 'userId is required',
    })
  }
  if (method === 'POST') {
    var isChat = await Chat.find({
      /* @dev:::by looking at both the conditions it can be observed this 
      was an api to handle search only for single chats not groups */
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } }
      ]
    })
      .populate('users', '-password')
      .populate('latestMessage')
    /* @dev:::first populated latestMessage then populated its(msg) sender field */
    isChat = await User.populate(isChat, {
      path: 'latestMessage.sender',
      select: 'username pic email',
    })
    if (isChat.length > 0) {
      res.send(isChat[0])
    } else {
      const chatNameField = await User.findOne({ _id: userId }, {username : 1});
      if(!chatNameField) {
        return res.status(400).json({
          status: 'error',
          message: 'User not found',
        })
      }
      var chatData = {
        chatName: chatNameField.username, 
        isGroupChat: false,
        users: [
          req.user._id, userId
        ]
      }
      try {
        /* newChat.populate without execPopulate would hv also worked */
        const newChat = await Chat.create(chatData)
        
        const fullChat = await Chat.findOne({_id: newChat._id})
          .populate('users', '-password')
        res.status(201).send(fullChat)
      } catch (err) {
        console.log(err)
        res.status(500).send(err)
      }
    }
  }
  // if (method === 'GET') {}
}

const fetchChats = async (req, res) => {
  try {
    const { method } = req
    if (method === 'GET') {
      Chat.find({ users: { $elemMatch: { $eq: req.user._id } }})
        // .populate('users', 'password') // will get me just password populated
        .populate('users', '-password')
        .then(async (data) => {
          await res.send(data)})
    }
  } catch (err) {
    res.status(400)
    throw new Error(err.message)
  }
}

export default AuthMiddleware(GetChats)