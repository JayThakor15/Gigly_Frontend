import { useState } from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import ClientDashboard from './pages/Dashboard/ClientDashboard'
import UserProfile from './pages/UserProfile'
import FreelancerDashboard from './pages/Dashboard/FreelancerDashboard'
import GigsCreation from './pages/GigsCreation'

function App() {
  

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<FreelancerDashboard />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/creategigs" element={<GigsCreation />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
