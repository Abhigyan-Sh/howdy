/* return type:  boolean
  description: Informs whether the message has been sent by logged in user or 
  by someone else in group or one-to-one chat.
  uses: 1) to determine whether to show avatar and name
        2) to determine bg color for message
        3) to determine position of message i.e. left or right */
export const isSentByLoggedInUser = (message, user) => {
  const userId = user._id
  const senderId = message.sender._id
  return userId == senderId
}

/* return type:  boolean
  description: Informs whether the current message has been sent by the user who 
  sent the previous message or not.
  uses: 1) to determine whether to show avatar and name (as consecutive 
    messages don't show avatar and name again) */
export const isConsecutiveSender = (messages, index) => {
  if(messages[index - 1]) {
    return messages[index - 1].sender._id === messages[index].sender._id
  }
  return false
}