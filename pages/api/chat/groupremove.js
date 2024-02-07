import Chat from '../../../models/chats'
import isValidObjectId from "../../../utils/isValidObjectId"

const removeFromGroup = async (req, res) => {
  const { method, body } = req
  const { chatId, userId } = body

  if (method === 'PUT') {
    try {
      // check if chatId and userId are valid ObjectId
      if(!isValidObjectId(chatId) && !isValidObjectId(userId)) {
        return res.status(400).json({ message: 'something went wrong !' })
      }
      // find the chat and remove the user from the group
      const updatedChatGroup = await Chat.findByIdAndUpdate(
        chatId, 
        {
          $pull: { users: userId }
        },
        {
          new: true,
        }
      )

      if (!updatedChatGroup) {
        return res.status(400).json({ message: 'Chat not found.' })
      }
      return res.status(200).json({ message: 'User removed from group.' })
    }
    catch (error) {
      // Handle any errors that occur during the operation
      console.error('Error removing user from group:', error);
      res.status(500).send('Internal Server Error');
    }
  } else {
    return res.status(405).json({ message: 'method not allowed' })
  }
}
export default removeFromGroup