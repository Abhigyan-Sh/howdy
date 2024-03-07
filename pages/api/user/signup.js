import withProtect from '../../../middlewares/withProtect.js'
import User from '../../../models/users.js'
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
      
      const formData = await User.create(body).select('-password')
      if (formData) {
        res.status(201).json({
          ...formData._doc, 
          token: generateToken(formData._id), 
        })
      } else {
        throw new Error('server error')
      }
    } catch (err) {
      console.log(err)
      throw new Error('server error')
    }
  }
}

export default withProtect(signup)