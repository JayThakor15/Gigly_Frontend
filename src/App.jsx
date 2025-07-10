import { useState } from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import UserProfile from './pages/UserProfile'

function App() {
  

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/userprofile" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
