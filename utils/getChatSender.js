import { chatState } from '../context/ChatProvider'

export const getChatSender = (users) => {
  const { user } = chatState()
  return users[0]._id == user._id ? users[1].username : users[0].username
}

export const getChatSenderFull = (users) => {
  const { user } = chatState()
  return users[0]._id == user._id ? users[1] : users[0]
}