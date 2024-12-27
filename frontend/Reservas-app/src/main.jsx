import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ReservaHotelesApp } from './ReservaHotelesApp.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StrictMode>
   <ReservaHotelesApp></ReservaHotelesApp>
  </StrictMode>
  </BrowserRouter>
)
