import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectToMongoDB from './utils/connectToMongoDB.js'
import user from './routes/user.js'
import chat from './routes/chat.js'
import message from './routes/message.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT

connectToMongoDB()

/* -------handle requests------- */
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: true}))

app.get('/', () => {})

app.use('/api/user', user)
app.use('/api/chat', chat)
app.use('/api/message', message)

app.listen(() => {
    console.log('listening on port: ', PORT)
})