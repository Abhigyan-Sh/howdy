import { randomBytes } from 'crypto'
import withProtect from '@middlewares/withProtect.js'
import User from '@models/users.js'
import Token from '@models/token.js'
import { sendEmail } from '@utils/sendEmail.js'
import connectToMongoDB from '@utils/mongoDB/connectMongo.js'
import { getBaseUrl } from '@utils/getBaseUrl.js'

const signup =  async (req, res) => {
  connectToMongoDB()
  const { method, body } = req

  if (method === 'POST') {
    try {
      const { email, username } = body
      /* check whether user exists already ? 
      even if user exists check whether if its verified ?, 
      if not then delete previous user document and create new */
      const userNameExists = await User.findOne({ username })
      const userExists = await User.findOne({ email })

      if(userExists || userNameExists) {
        if(userExists && !userExists?.isVerified) {
          await User.findByIdAndDelete(userExists?._id)
          await Token.findOneAndDelete({ userId : userExists?._id })
        } else if(userNameExists && !userNameExists?.isVerified) {
          await User.findByIdAndDelete(userNameExists?._id)
          await Token.findOneAndDelete({ userId : userNameExists?._id })
        } else {
          const errorMessage = (userExists && userNameExists)
          ? 'credentials already exists' 
          : userExists 
            ? `user with ${userExists?.email} already exists`
            : `user with username: ${userNameExists?.username} already exists`
          
          return res.status(400).json({ 
            statusCode: 400, 
            error: errorMessage
          })
        }
      }
      
      // STEP_1: store user on mongoDB with isVerified = false
      const user = await User.create(body)
      if(!user) 
        return res.status(500)
          .json({ statusCode: 500, error: 'could not create user' })
      
      // STEP_2: create a verificationToken and store it with userId 
      const token = await Token.create({
        userId: user._id, 
        verificationToken: randomBytes(32).toString('hex')
      })
      if(!token) 
        return res.status(500)
          .json({ statusCode: 500, error: 'could not create token' })

      // STEP_3: create a backend service to send mail having this token and userId
      const domain = getBaseUrl()
      const mail_email = user.email
      const mail_subject = `verify your e-mail 😄 ${user.username}`
      const mail_content = `click on the link to verify your email with howdy ${
        domain
      }/users/${token.userId}/verify/${token.verificationToken}`

      const backendService = await sendEmail(mail_email, mail_subject, mail_content)
      if(backendService.status !== 'ok') {
        return res.status(500).json({ statusCode: 500, error: 'could not send mail' })
      }

      // STEP_4: send a response which pivots signup page to another page
      res.status(201).json({
        statusCode: 201,
        message: 'we sent something your way ⚡'
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        statusCode: 500, 
        error: 'Internal Server Error'
      })
    }
  }
}

export default withProtect(signup)