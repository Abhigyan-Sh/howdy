import User from '../../../models/users.js'
import Token from '../../../models/token.js'
import connectToMongoDB from '../../../utils/connectMongo.js'
import generateToken from '../../../utils/generateToken.js'

const verify_user = async (req, res) => {
  connectToMongoDB()
  const { method, body } = req

  if(method == 'POST') {
    try {
      const { userId, verification_token } = body

      // find the token which exists with this userId
      const sessionToken = await Token.findOne({ userId })
      if(!sessionToken) {
        return res.status(404).json({ 
          statusCode: 404, 
          error: 'sessionToken not found !' 
        })
      }

      // whether token on db and from url are same ?
      const verified = sessionToken.verificationToken === verification_token
      if(!verified) {
        return res.status(401).json({ 
          statusCode: 401, 
          error: 'wrong token !' 
        })
      }

      // deleting sessionToken
      await Token.deleteOne({ userId: sessionToken.userId })
      
      const user = await User.findByIdAndUpdate(userId, { isVerified : true })
      if(!user) {
        return res.status(400).json({ 
          statusCode: 400, 
          error: 'user not found !' 
        })
      }

      // send user to avoid login
      delete user._doc.password
      user._doc.isVerified = true

      res.status(200).json({
        ...user._doc, 
        token: generateToken(user._id),
        statusCode: 200
      })
    }
    catch(error) {
      console.log(error)
      res.status(500).json({ statusCode: 500, error: 'Internal Server Error' })
    }
  }
}

export default verify_user