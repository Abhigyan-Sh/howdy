import ErrorBoundary from '../components/ErrorBoundary'
import ChatProvider from '../context/ChatProvider'
import SnackbarProvider from '../context/SnackbarToast'
import TransactProvider from '../context/TransactProvider'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <ChatProvider>
        <SnackbarProvider>
          <TransactProvider>
            <Component {...pageProps}/>
          </TransactProvider>
        </SnackbarProvider>
      </ChatProvider>
    </ErrorBoundary>
  )
}

export default MyApp