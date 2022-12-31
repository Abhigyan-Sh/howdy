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
      ref: 'Message',
    },
    groupAdmin: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'users' 
    },
  },
  { timestamps: true }
)

const chat = mongoose.models.chat || mongoose.model('chat', chatSchema)
export default chat