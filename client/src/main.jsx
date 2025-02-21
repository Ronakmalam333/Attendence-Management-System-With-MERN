import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { Schedule } from './components/context/Schedule.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Schedule>
      <Token>
        <App />
      </Token>
    </Schedule>
  </StrictMode>,
)
