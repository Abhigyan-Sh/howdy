import mongoose from 'mongoose'

const tokenSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, 
      required: true, 
    }, 
    verificationToken: {
      type: String, 
      required: true, 
      unique: true
    },
    createdAt: {
      type: Date, 
      default: Date.now, 
      expires: 14400 // 4 * 3600 seconds
    }
  }
)

const tokens = mongoose.models.tokens || mongoose.model('tokens', tokenSchema)
export default tokens