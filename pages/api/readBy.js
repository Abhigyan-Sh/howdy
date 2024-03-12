import Message from '@models/messages'
import authMiddleware from '@middlewares/authMiddleware'
import { isValidObjectId } from '@utils/mongoDB/isValidObjectId'

const readBy = async (req, res) => {
  const { method, body } = req
  const { userId, messageId } = body

  if(method === 'POST') {
    try {
      if(!isValidObjectId(userId)) {
        return res.status(401)
        .json({ statusCode: 401, error: 'invalid user id' })
      }
      if (!isValidObjectId(messageId)) {
        return res.status(401).json({ statusCode: 401, error: 'Invalid message id' })
      }
      const message = await Message
      .findByIdAndUpdate(messageId, 
        { $addToSet: { readBy: userId } }, 
        { new : true}
      ).populate('readBy')

      if (!message) {
        return res.status(404).json({ statusCode: 404, error: 'message not found' })
      }
      return res.status(200).json({ statusCode: 200, message })
    } catch (error) {
      return res.status(500).json({ statusCode: 500, error: 'server error'})
    }
  } else {
    return res.status(400).json({ statusCode: 400, error: 'method not allowed'})
  }
}

export default authMiddleware(readBy)