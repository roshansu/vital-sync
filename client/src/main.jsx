import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AppProvider } from './hooks/AppContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AppProvider>
      <App />
   </AppProvider>
  </StrictMode>,
)
