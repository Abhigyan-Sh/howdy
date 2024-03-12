import Message from '@models/messages'

const allMessages = async (req, res) => {
  const { method } = req
  const { chatId } = req.query

  if (method === 'GET') {
    try {
      let messages = await Message.find({ chat: chatId })
        .populate("sender", "username pic email")
        .populate("chat")
        .populate("readBy", "username pic")
      if (!messages) {
        return res.status(404).json({ statusCode: 404, error: 'Messages not found' })
      }
      return res.status(200).json({ statusCode: 200, messages })
    } catch (error) {
      return res.status(500).json({ statusCode: 500, error: 'Internal Server Error' })
    }
  } else {
    return res.status(405).json({ statusCode: 405, error: 'Method Not Allowed' })
  }
}

export default allMessages