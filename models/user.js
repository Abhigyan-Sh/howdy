import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema(
  {
    username: { 
        type: 'String', 
        required: true 
    },
    email: { 
        type: 'String', 
        unique: true, 
        required: true 
    },
    password: { 
        type: 'String', 
        required: true 
    },
    pic: {
      type: 'String',
      required: false,
      default:
        'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const user = mongoose.model.user || mongoose.model('user', userSchema)
export default user