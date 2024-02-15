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
        return res.status(400).json({ statusCode: 400, error: "Invalid request !" })
      }
      await Chat.findByIdAndUpdate(chatId, {chatName})
      res.status(200).json({ statusCode: 200, data: `Chat has been renamed to ${chatName}` })
    } catch (err) {
      res.status(500).json({ statusCode: 500, error: err.message })
    }
  }
}
export default renameGroup