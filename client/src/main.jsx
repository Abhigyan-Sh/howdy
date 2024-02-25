import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import ChatProvider from './context/ChatProvider.jsx'
import Authorization from './Authorization.jsx'
// import '../styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <ChatProvider>
          <Routes>
            <Route path="/" element={<Authorization />} />
            {/* <Route path="/chats" element={}/> */}
          </Routes>
        </ChatProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>,
)