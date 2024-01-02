import React from 'react'
import ReactDOM from 'react-dom/client'
import ShipmentForm from './components/ShipmentForm.tsx'
import ShipmentList from './components/ShipmentList.jsx'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ShipmentForm />
    <ShipmentList />
  </React.StrictMode>,
)
