import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './Components/styles.css'
import GameUI from './Components/MainGame.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GameUI />
  </StrictMode>,
)
