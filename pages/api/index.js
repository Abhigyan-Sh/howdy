import connectMongoDB from '../../utils/connectMongo.js'

export default async (req, res) => {
  const { method } = req
  /* connect to MongoDb */
  connectMongoDB()
  
  if (method === 'GET') {
    try {
      res.status(200).send('success')
    } catch (err) {
      console.log(err)
    }
  }
}