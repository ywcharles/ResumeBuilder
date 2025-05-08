import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import useUser from "./Store/useUserStore";
import Home from "./pages/Home";

function App() {
  const [user] = useUser();

  return (
    <div>
      <Navbar />
      {user ? <Dashboard /> : <Home />}
    </div>
  );
}

export default App;
