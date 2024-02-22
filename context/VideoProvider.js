import { useState, useEffect, createContext, useContext } from 'react'

const VideoContext = createContext()

const VideoProvider = ({ children }) => {
    const [ videoSocket, setVideoSocket ] = useState()
    
    useEffect(() => {
    }, [])
    return (
        <VideoContext.Provider value={{  }}>
          {children}
        </VideoContext.Provider>
    )
}

const videoState = () => (
    useContext(VideoContext)
)

export { videoState, VideoProvider }
export default VideoProvider