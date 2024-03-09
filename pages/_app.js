import ErrorBoundary from '@components/ErrorBoundary'
import { ChatProvider, SnackbarToast, TransactProvider } from '@context/index'
import '@styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <ChatProvider>
        <SnackbarToast>
          <TransactProvider>
            <Component {...pageProps}/>
          </TransactProvider>
        </SnackbarToast>
      </ChatProvider>
    </ErrorBoundary>
  )
}

export default MyApp