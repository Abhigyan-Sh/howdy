import User from '../../../models/users'
import AuthMiddleware from '../../../middlewares/authMiddleware'

const allUsers = async (req, res) => {
  try {
    const keyword = req.query
      ? {
        $or: [
          { username: { $regex: req.query.user, $options: 'i'} },
          { email: { $regex: req.query.user, $options: 'i'} },
        ]
      } : {}
    /* return all users but not the one who is logged-in */
    const users = await User.find(keyword).find({_id: {$ne: req.user._id}})
    res.status(200).json({ 
      statusCode: 200, 
      users: users
    })
  } catch (error) {
      console.error('Error occurred while fetching users:', error)
      res.status(500).json({ 
        statusCode: 500, 
        message: 'Internal server error' 
      })
  }
}

export default AuthMiddleware(allUsers)