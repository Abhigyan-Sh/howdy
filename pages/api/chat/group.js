import Chat from '@models/chats'
import authMiddleware from '@middlewares/authMiddleware'

const createGroupChat = async (req, res) => {
  console.log(req.user) // logged-in user
  var users = req.body.users // users array, the ones to be added
  if (!users || !req.body.name) {
    return res.status(400).send({ message: 'Please Fill all the fields' })
  }

  // malicious code injection checks
  if(users.includes(req.user._id.toString())) 
  {
    return res.status(400).send({ message: 'You cannot add yourself to the group' })
  }

  // var users = JSON.parse(req.body.users) // switch to below in case of postman

  if (!(users.length >= 2)) {
    return res
      .status(400)
      .send('More than 2 users are required to form a group chat')
  }

  users.push(req.user)

  try {
    // create a blank groupChat
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    })

    // create fullGroupChat (chat + populated users)
    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate('users', '-password')
      .populate('groupAdmin', '-password')

    res.status(200).json(fullGroupChat)
  } catch (error) {
    res.status(400)
    throw new Error(error.message)
  }
}

export default authMiddleware(createGroupChat)