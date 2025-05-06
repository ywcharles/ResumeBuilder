import { useState, useEffect } from 'react'

import Hero from './pages/Hero'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'

function App() {
  const [user, setUser] = useState(null)

  return (
    <div>
      <Navbar/>
      {user ?
        <Dashboard/> :
        <Hero/>
      }
    </div>
  )
}

export default App
