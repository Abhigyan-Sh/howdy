import { chatState } from '../context/ChatProvider'

const getChatSender = (users) => {
  const { user } = chatState()
  return users[0]._id == user._id ? users[1].username : users[0].username
}

const getChatSenderFull = (users) => {
  const { user } = chatState()
  return users[0]._id == user._id ? users[1] : users[0]
}

const getChatSendersAddress = (users) => {
  const { user } = chatState()
  return users[0]._id == user._id ? users[1].address : users[0].address
}

export { getChatSender, getChatSenderFull, getChatSendersAddress }