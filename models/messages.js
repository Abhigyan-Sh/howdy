import mongoose from 'mongoose'

const messageSchema = mongoose.Schema(
  {
    sender: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'users' 
    },
    content: { 
      type: String, 
      trim: true 
    },
    chat: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'chats' 
    },
    readBy: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'users' 
    }],
  },
  { timestamps: true }
)

const messages = mongoose.models.messages || mongoose.model('messages', messageSchema)
export default messages