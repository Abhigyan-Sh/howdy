import User from '../../../models/user.js'
import generateToken from '../../../utils/generateToken.js'
import connectToMongoDB from '../../../utils/connectMongo.js'

const signin =  async (req, res) => {
  connectToMongoDB()
  const { method, body } = req
  if (method === 'POST') {
    const { email, password } = body
    const user = await User.findOne({email})  
    if ( user && (await user.matchPassword(password))) {
      res.status(200).json({
        _id: user.id,
        username: user.username,
        email: user.email,
        pic: user.pic,
        token: generateToken(user._id),
        statusCode: 200
      })
    } else {
      res.status(401).json({
        statusCode: 401,
        message: 'wrong credentials!'
      })
    }
  }
}

export default signin
