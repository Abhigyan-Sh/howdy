import { AudioGear } from 'react-audio-gear'
import { CloudinaryVideo } from '@cloudinary/url-gen'
import { bitRate } from '@cloudinary/url-gen/actions/transcode'
import { extractCloudinaryPublicId } from '../../utils/extractCloudinaryPublicId'
// import { getFileFormat } from '../../utils/computeFileProps'

const AudioPlayer = ({ src }) => {
  /* bitRateValue: this factor can be manipulated by taking into 
  consideration the bandwidth */
  const bitRateValue = '90k'
  const publicId = new CloudinaryVideo(extractCloudinaryPublicId(src))
    .transcode(bitRate(bitRateValue)).publicID
  
  return (
    <AudioGear 
      audioSrc={`https://res.cloudinary.com/dfgh07xa9/video/upload/${publicId}`} />
    // <audio controls>
    //   <source 
    //     // src={src} 
    //     // exposing the audio directory path
    //     src={`https://res.cloudinary.com/dfgh07xa9/video/upload/${publicId}`} 
    //     type={`audio/${getFileFormat(src)}`} />
    //   Your browser does not support the audio element.
    // </audio>
  )
}

export default AudioPlayer