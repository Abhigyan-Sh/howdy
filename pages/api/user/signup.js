import withProtect from '../../../middlewares/withProtect.js'
import User from '../../../models/user.js'
import generateToken from '../../../utils/generateToken.js'

const signup =  async (req, res) => {
    const { method } = req
    console.log(method)
        if (method === 'POST') {
            try {
                const { username, email, password, pic } = req.body
                const userExists = await User.findOne({ email })
                
                userExists && res.status(400).send('User already exists')
                
                const formData = await User.create(req.body)
                if (formData) {
                    res.status(201).json({
                        _id: formData._id,
                        username: formData.username,
                        email: formData.email,
                        pic: formData.pic,
                        token: generateToken(formData._id)
                    })
                } else {
                    throw new Error('SERver erroR')
                }
            } catch (err) {
                console.log(err)
            }
    }
}

export default withProtect(signup)

/* formData.token = generateToken(formData._id)
const fori = JSON.parse(String(formData))
res.status(201).json(formData) */