import React from 'react'
import ReactDOM from 'react-dom/client'
import LoadForm from './components/LoadForm.tsx'
import App from './components/ShipmentList.jsx'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoadForm />
    <App />
  </React.StrictMode>,
)
