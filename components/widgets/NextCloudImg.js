// import { CldImage } from 'next-cloudinary'
// import 'next-cloudinary/dist/cld-video-player.css'
// import { extractCloudinaryPublicId } from '../../utils/extractCloudinaryPublicId'

const NextCloudImage = ({ src }) => (
  <div className='max-w-64 max-h-64 overflow-hidden shadow-md'>
    {/* <div className='relative w-80 h-80 max-w-80 max-h-80 overflow-hidden'> */}
    {/* <CldImage 
      src={extractCloudinaryPublicId(src)}
      layout="fill"
    //   width="200"
    //   height="200"
      alt="message"
      crop="fill"
      gravity="face"
    /> */}
    <img src={src} alt="message" className={'rounded-lg'} />
  </div>
)

export default NextCloudImage