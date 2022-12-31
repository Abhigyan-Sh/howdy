// import { NextResponse } from 'next/server'
// // import connectToMongoDB from './utils/connectMongo.js'

// const middleware = async (req, res) => {
//   console.log(req.body, 'feware')
//   //   console.log(req.nextUrl.pathname)
//   if (req.nextUrl.pathname.startsWith('/user')) {
//     // console.log('hi abhi09')
//     // connectToMongoDB()
//     // return NextResponse.rewrite(new URL('/user', request.url))
//     return NextResponse.rewrite(req.nextUrl)
//   }
//     // if (request.nextUrl.pathname.startsWith('/user')) {
//     //     connectToMongoDB()
//     // const { username, email, password } = request
//     // if (!username || !email || !password) {
//     //   res.status(400)
//     //   throw new Error('Please enter all fields')
//     // }
//     //     return NextResponse.rewrite(new URL('/user', request.url))
//     // }
// }

// export default middleware
