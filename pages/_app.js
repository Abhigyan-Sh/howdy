import ErrorBoundary from '../components/ErrorBoundary'
import ChatProvider from '../context/ChatProvider'
import VideoProvider from '../context/VideoProvider'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <ChatProvider>
        <VideoProvider>
          <Component {...pageProps}/>
        </VideoProvider>
      </ChatProvider>
    </ErrorBoundary>
  )
}

export default MyApp