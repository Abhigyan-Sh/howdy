import mongoose from 'mongoose'

const chatSchema = mongoose.Schema(
  {
    chatName: {
      type: String, 
      trim: true 
    },
    isGroupChat: {
      type: Boolean, 
      default: false 
    },
    users: [{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'users'
    }],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'messages',
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'users' 
    },
  },
  { timestamps: true }
)

const chats = mongoose.models.chats || mongoose.model('chats', chatSchema)
export default chats