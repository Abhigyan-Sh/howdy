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
    blockchain: {
      paidTo: {
        type: String
      },
      amount: {
        type: Number
      }
    }, 
    metaData: {
      title: String,
      description: String,
      imageUrl: String
    }, 
    media: {
      type: String,
    }, 
    chat: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'chats' 
    },
    readBy: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'users' 
    }],
    contentType: {
      type: String,
      enum: ['blockchain', 'metaData', 'media', ''],
    }, 
  },
  { timestamps: true }
)

messageSchema.pre('save', function(next) {
  const fields = ['blockchain', 'metaData', 'media']
  const presentFields = fields.filter(field => (
    this[field] !== undefined 
    && this[field] !== '' 
    && (typeof this[field] === 'object' && Object.keys(this[field]).length === 0 )
  ))
  // console.log(presentFields)
  if (presentFields.length > 1) {
    return next(new Error('Only one of blockchain, metaData, or media can be present'))
  }
  next()
})

const messages = mongoose.models.messages || mongoose.model('messages', messageSchema)
export default messages