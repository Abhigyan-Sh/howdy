import withProtect from '../../../middlewares/withProtect.js'
import User from '../../../models/user.js'
import generateToken from '../../../utils/generateToken.js'
import connectToMongoDB from '../../../utils/connectMongo.js'

const signup =  async (req, res) => {
  connectToMongoDB()
  const { method, body } = req
  if (method === 'POST') {
    try {
      const { email } = body
      const userExists = await User.findOne({email})
      userExists && res.status(400).send('User already exists')
      
      const formData = await User.create(body)
      if (formData) {
        res.status(201).json({
          _id: formData._id,
          username: formData.username,
          email: formData.email,
          pic: formData.pic,
          token: generateToken(formData._id)
        })
      } else {
        throw new Error('SERver erroR')
      }
    } catch (err) {
      console.log(err)
      throw new Error('SERver erroR')
    }
  }
}

export default withProtect(signup)
