import Chat from '../../../models/chats'
import isValidObjectId from '../../../utils/isValidObjectId'

const addToGroup = async (req, res) => {
  const { method, body } = req
  const { chatId, userId } = body
  if (method === 'PUT') {
    if(!isValidObjectId(chatId) || !isValidObjectId(userId)) {
      return res.status(400).send('something went wrong !')
    }

    try {
      await Chat.findByIdAndUpdate(chatId, {
        $push: {users: userId}
      })
      res.status(200).send('added successfully !')
    } catch (err) {
      res.status(500).send(err.message)
    }
  }
}
export default addToGroup