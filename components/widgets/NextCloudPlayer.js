import { CldVideoPlayer } from 'next-cloudinary'
import 'next-cloudinary/dist/cld-video-player.css'
import { extractCloudinaryPublicId } from '../../utils/extractCloudinaryPublicId'

const NextCloudPlayer = ({ src }) => (
  <div className='w-32 sm:w-52 md:w-80 shadow-md'>
    <CldVideoPlayer 
      // GENERAL PROPS::
      src={extractCloudinaryPublicId(src)}
      // width='220'
      // height='200'
      className={'rounded-lg'}
      onError={() => console.log('player onError event kicked')}
      muted={true}
      logo={{
        imageUrl: 'https://res.cloudinary.com/dfgh07xa9/image/upload/v1709068887/samples/logo_oh2pso.png', 
        onClickUrl: 'https://github.com/Abhigyan-Sh/', 
      }}
      // VISUAL PROPS::
      aiHighlightsGraph={true}
      pictureInPictureToggle={true}
      // playbackRates={[]}
      fluid={true}
      colors= {{
        accent: '#2563eb', 
      }}
      // VIDEO CONFIG PROPS::
      // sourceTypes={['hls']}
    />
  </div>
)

export default NextCloudPlayer