import connectToMongoDB from '../utils/connectMongo.js'

const withProtect = (handler) => {
  return async (req, res) => {
    connectToMongoDB()
    const { username, email, password } = req.body
    if (!username || !email || !password) {
      res.status(400)
      throw new Error('Please enter all fields')
    }
    return handler (req, res)
  }
}

export default withProtect