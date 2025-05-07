import Hero from './pages/Hero'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import useUser from './Store/useUserStore'

function App() {
  const [user, setUser] = useUser()

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
