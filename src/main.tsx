import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CELL_SIZE } from './types/cell'

// Set CSS variables from the single source of truth in TypeScript
const docRoot = document.documentElement
docRoot.style.setProperty('--cell-size', `${CELL_SIZE}px`)
docRoot.style.setProperty('--spacing-cell', `${CELL_SIZE}px`)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
