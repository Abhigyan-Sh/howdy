import ErrorBoundary from '../components/ErrorBoundary'
import ChatProvider from '../context/ChatProvider'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <ChatProvider>
        <Component {...pageProps}/>
      </ChatProvider>
    </ErrorBoundary>
  )
}

export default MyApp