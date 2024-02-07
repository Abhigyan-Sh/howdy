import Message from '../../../models/messages'

const allMessages = async (req, res) => {
    const { method } = req
    const { chatId } = req.query
    if(method == 'GET') {
        try {
            let messages = await Message.find({ chat: chatId })
            .populate("sender", "username pic email")
            .populate("chat")
            // .populate({
            //     path: "sender",
            //     select: "username pic email"
            // })            
            return res.status(200).json(messages)
        } catch (error) {
            return res.status(400).send(error)
        }
    }
}
export default allMessages