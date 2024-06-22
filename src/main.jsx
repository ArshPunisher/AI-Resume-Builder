import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'
import { BrowserRouter } from 'react-router-dom'
import FirebaseProvider from './Context/FirebaseContext.jsx'
import ScrollToTop from './components/Custom/ScrollToTop.jsx'
import { Toaster } from './components/ui/toaster.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FirebaseProvider>  
    <BrowserRouter>
    <ScrollToTop/>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Toaster/>
      <App />
    </ClerkProvider>
    </BrowserRouter>
    </FirebaseProvider>
  </React.StrictMode>,
)
