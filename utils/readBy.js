export const readBy = (message) => {
    const countOf_recipients = message.chat.users.length
    const countOf_readyBy = message.readBy.length
    return countOf_recipients - 1 === countOf_readyBy
}