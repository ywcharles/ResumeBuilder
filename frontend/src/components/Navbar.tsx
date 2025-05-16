import { Link } from 'react-router-dom';
import useUser from "../Store/useUserStore";

const userTabs = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Experiences", path: "/experiences" },
  { name: "Resumes", path: "/resumes" },
];

const navTabs = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

const Navbar = () => {
  const [user, setUser] = useUser();

  const tabs = user ? userTabs : navTabs;
  
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <nav className="sticky top-0 bg-gray-800 shadow-md z-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Left side */}
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-xl mr-8">
              ResumeBuilder
            </Link>
            
            {/* Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {tabs.map((tab) => (
                <Link
                  key={tab.name}
                  to={tab.path}
                  className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-gray-700 transition duration-150 ease-in-out"
                >
                  {tab.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center">
            {user ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition duration-150 ease-in-out"
              >
                Log out
              </button>
            ) : (
              <Link
                to="/auth"
                className="px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition duration-150 ease-in-out"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
