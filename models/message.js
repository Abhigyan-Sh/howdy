import mongoose from 'mongoose'

const messageSchema = mongoose.Schema(
  {
    sender: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user' 
    },
    content: { 
        type: String, 
        trim: true 
    },
    chat: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'chat' 
    },
    readBy: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user' 
    }],
  },
  { timestamps: true }
)

const message = mongoose.models.message || mongoose.model('message', messageSchema)
export default message