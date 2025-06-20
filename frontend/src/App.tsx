import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import useUser from "./Store/useUserStore";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import ResumeBuilder from './pages/ResumeBuilder';
import Experiences from './pages/Experiences';
import Resumes from './pages/Resumes'

function App() {
  const [user] = useUser();

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={user ? <Navigate to="/dashboard" /> : <Auth />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/auth" />} />
          <Route path="/resume-builder" element={user ? <ResumeBuilder /> : <Navigate to="/auth" />} />
          <Route path="/experiences" element={user ? <Experiences/> : <Navigate to="/auth" />} />
          <Route path="/resumes" element={user ? <Resumes/> : <Navigate to="/auth" />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
