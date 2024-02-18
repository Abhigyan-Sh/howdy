export const isSentByLoggedInUser = (message, user) => {
  const userId = user._id
  const senderId = message.sender._id
  return userId == senderId
}

export const isConsecutiveSender = (messages, index) => {
  if(messages[index - 1]) {
    return messages[index - 1].sender._id === messages[index].sender._id
  }
  return false
}