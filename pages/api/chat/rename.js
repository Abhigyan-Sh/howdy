import Chat from '../../../models/chats'
import connectToMongo from '../../../utils/connectMongo'

const renameGroup = async (req, res) => {
  connectToMongo()
  const {method, body} = req
  const { chatId, chatName } = body
  if (method === 'PUT') {
    try {
      // you can put a check that chatName shouldn't be the same as previous
      // also wrap with authMiddleware
      if (!chatId || !chatName) {
        return res.status(400).send('Invalid request !')
      }
      await Chat.findByIdAndUpdate(chatId, {chatName})
      res.status(200).send(`Chat has been renamed to ${chatName}`)
    } catch (err) {
      res.status(500).send(err.message)
    }
  }
}
export default renameGroup
// @dev:: make it such that it tells if name already matches the previous name