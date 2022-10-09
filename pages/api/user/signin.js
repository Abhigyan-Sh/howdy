import User from '../../../models/user.js'
import generateToken from '../../../utils/generateToken.js'
import connectToMongoDB from '../../../utils/connectMongo.js'

const signin =  async (req, res) => {
    connectToMongoDB()
    const { method } = req
    if (method === 'GET') {
        const { email, password } = req.body
        const user = await User.findOne({email})

        if ( user && (await user.matchPassword(password))) {
            res.json({
                _id: user.id,
                username: user.username,
                email: user.email,
                pic: user.pic,
                token: generateToken(user._id)
            })
        } else {
            res.status(400)
            throw new Error('Failed to create the user!')
        }
    }
}

export default signin