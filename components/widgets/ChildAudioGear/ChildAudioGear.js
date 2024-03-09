import { useState, useRef, useEffect } from 'react'
import { getTimeFormat } from './utils/getTimeFormat'
import { getSongNameFromUrl } from './utils/getSongName'
import { truncateString } from './utils/truncateString'

const ChildAudioPlayer = ({ audioSrc = '', darkMode }) => {  
  const [ isPlaying, setIsPlaying ] = useState(false)
  const [ currentTime, setCurrentTime ] = useState(0)
  const [ duration, setDuration ] = useState(0)

  const audioRef = useRef(null)

  const handleSeek = (e) => {
    const seekedTime = e.target.value
    audioRef.current.currentTime = seekedTime
    setCurrentTime(seekedTime)
  }
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime)
    setDuration(audioRef.current.duration)
  }

  const handlePlay = () => {
    audioRef.current.play()
    setIsPlaying(true)
  }
  const handlePause = () => {
    audioRef.current.pause()
    setIsPlaying(false)
  }
  const handlePlayPause = () => {
    isPlaying 
    ? handlePause() 
    : handlePlay()
  }

  useEffect(() => {
    const currentVal = audioRef.current
    /* @dev:: 'timeupdate' isn't any custom event and it gets fired 
    continuously as audio is being played */
    currentVal.addEventListener('timeupdate', handleTimeUpdate)

    return () => {
      currentVal.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [])
  return (
    <div className='audio-gear-player-card audio-gear-kode-mono'>
      
      {/* top sub-component */}
      <div className='audio-gear-info'>
        <p className='audio-gear-text audio-gear-relative'>
          {truncateString(getSongNameFromUrl(audioSrc), 30)}
          {isPlaying && <div className='audio-gear-blinking-dot'></div>}
        </p>
        <img 
          src={!darkMode 
            ? 'https://utillities.netlify.app/react-audio-gear/musicPlayer-dark.svg' 
            : 'https://utillities.netlify.app/react-audio-gear/musicPlayer-light.svg'}
          alt='audio file' 
          className='audio-gear-img' 
        />
      </div>

      {/* middle sub-component */}
      <div className='audio-gear-SeekBar-timer'>
        <p className='audio-gear-fontSize'>{getTimeFormat(currentTime)}</p>
        <input 
          type='range'
          min='0'
          max={duration}
          value={currentTime}
          onChange={handleSeek}
        />
        <audio ref={audioRef} src={audioSrc} />
        <p className='audio-gear-fontSize'>{getTimeFormat(duration)}</p>
      </div>

      {/* bottom sub-component */}
      <button className='audio-gear-button' onClick={handlePlayPause}>
        {!isPlaying 
        ? <img src='https://utillities.netlify.app/react-audio-gear/play.svg' alt='play' style={{ width: '32px' }} />
        : <img src='https://utillities.netlify.app/react-audio-gear/pause.svg' alt='pause' style={{ width: '32px' }} /> }
      </button>
    </div>
  )
}

export default ChildAudioPlayer