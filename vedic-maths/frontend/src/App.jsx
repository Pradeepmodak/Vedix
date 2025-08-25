import React from 'react'
import HeaderBar from './components/Header'
import SutraCard from './components/SutraCard'
import Footer from './components/Footer'
import './styles/index.css' // Ensure your styles are imported
import { Route, Routes } from 'react-router-dom'
import RoutingScheme from './components/RoutingScheme'

const App = () => {
  return (
    <div>
    <HeaderBar />
    <Routes>
      <Route path="/" element={<SutraCard />} />
      <Route path="/sutra/:id" element={<RoutingScheme/>}/>
      </Routes>
    <Footer />
    </div>
  )
}

export default App