import { ChakraProvider } from '@chakra-ui/react'
import ErrorBoundary from '../components/ErrorBoundary'

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <ChakraProvider>
        <Component {...pageProps}/>
      </ChakraProvider>
    </ErrorBoundary>
  )
}

export default MyApp
