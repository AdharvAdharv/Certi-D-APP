import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CertProvider } from './Context/Certificate.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CertProvider>
    <App />

    </CertProvider>
  </StrictMode>,
)
