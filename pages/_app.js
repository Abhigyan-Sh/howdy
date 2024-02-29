import ErrorBoundary from '../components/ErrorBoundary'
import ChatProvider from '../context/ChatProvider'
import SnackbarProvider from '../context/SnackbarToast'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <ChatProvider>
        <SnackbarProvider>
          <Component {...pageProps}/>
        </SnackbarProvider>
      </ChatProvider>
    </ErrorBoundary>
  )
}

export default MyApp