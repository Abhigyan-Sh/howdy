import User from '../../../models/users'
import { isValidEthereumAddress } from '../../../utils/transactions/isValidEthereumAddress'
import AuthMiddleware from '../../../middlewares/authMiddleware'

const updateAddress = async (req, res) => {
  try {
    const { method } = req
    const { userAddress } = req.body

    if(method == 'POST') {
      if(!isValidEthereumAddress(userAddress)) {
        return res.status(400).json({ 
          statusCode: 400, 
          error: "invalid wallet address or doesn't exist over sepolia"
        })
      }
      const user = await User.findById(req.user)
      if (!user) {
        return res.status(404).json({ statusCode: 404, error: 'user not found' })
      }
      user.address = userAddress
      await user.save()
      
      res.status(200).json({ statusCode: 200, message: 'ethereum wallet address updated successfully' })
    } else {
      res.status(400).json({ statusCode: 400, error: 'method not allowed' })
    }
  } catch (error) {
    console.error('error: ', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export default AuthMiddleware(updateAddress)