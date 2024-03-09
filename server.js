/* Connect MongoDB:
   keeping MongoDB connection setup at the level of package.json will ensure 
   that the connection is established before communicating to any API
*/
import connectToMongoDB from '@utils/mongoDB/connectMongo'

connectToMongoDB()