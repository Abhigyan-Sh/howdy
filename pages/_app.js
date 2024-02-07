import { ChakraProvider } from '@chakra-ui/react'
import ErrorBoundary from '../components/ErrorBoundary'
import ChatProvider from '../context/ChatProvider'

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <ChakraProvider>
        <ChatProvider>
          <Component {...pageProps}/>
        </ChatProvider>
      </ChakraProvider>
    </ErrorBoundary>
  )
}

export default MyApp
