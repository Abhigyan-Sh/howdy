import Chat from '../../../models/chats'
import { isValidObjectId } from '../../../utils/isValidObjectId'

const modifyGroup = async (req, res) => {
  const { method, body } = req
  const { chatId, userIds } = body

  if (method === 'PUT') {
    if (!isValidObjectId(chatId)) {
      return res.status(400).json({ statusCode: 400, error: 'Invalid chat ID' })
    }

    if (!Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({ statusCode: 400, error: 'Invalid user IDs array' })
    }
    if(userIds.length < 3) {
      return res.status(400).json({ 
        statusCode: 400, 
        error: 'More than 2 users are required to form a group chat' 
      })
    }

    try {
      let updatedChatGroup = await Chat.findByIdAndUpdate(
        chatId,
        { users: userIds },
        { new: true }
      )

      if (!updatedChatGroup) {
        return res.status(404).json({ statusCode: 404, error: 'Chat not found' })
      }

      return res.status(200).json({ 
        statusCode: 200, 
        message: 'Chat group modified successfully', updatedChatGroup 
      })
    } catch (error) {
      console.error('Error modifying group:', error)
      res.status(500).json({ statusCode: 500, error: 'Internal Server Error' })
    }
  } else {
    return res.status(405).json({ statusCode: 405, error: 'Method not allowed' })
  }
}

export default modifyGroup