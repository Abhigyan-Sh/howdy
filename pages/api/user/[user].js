import User from '../../../models/user.js'
import AuthMiddleware from '../../../middlewares/authMiddleware.js'

const allUsers = async (req, res) => {
  const keyword = req.query
    ? {
      $or: [
        { username: { $regex: req.query.user, $options: 'i'} },
        { email: { $regex: req.query.user, $options: 'i'} },
      ]
    } : {}
  // return all users but not the one who is logged-in
  const users = await User.find(keyword).find({_id: {$ne: req.user._id}})
  res.send(users)
}

export default AuthMiddleware(allUsers)
