import connectToMongoDB from '../utils/connectMongo.js'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const AuthMiddleware = (handler) => {
  return async (req, res) => {
    connectToMongoDB()
    // code goes here..
    let token
    if (req.headers.authorization && 
      req.headers.authorization.startsWith('Bearer ')) {
      try {
        token = req.headers.authorization.split(' ')[1]
        // eslint-disable-next-line no-undef
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decodedToken.payload).select('-password')
        return handler(req, res)
      } catch (err) {
        res.status(401)
        throw new Error('not Authorized, token failed!')
      }
    }
    return handler (req, res)
  }
}

export default AuthMiddleware
