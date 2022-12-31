import jwt from 'jsonwebtoken'

const generateToken = (payload) => {
  // eslint-disable-next-line no-undef
  return jwt.sign({payload}, process.env.JWT_SECRET, {
    expiresIn: '24h'
  })
}

export default generateToken