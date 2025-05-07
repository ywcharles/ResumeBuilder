import useUser from "../Store/useUserStore";

const userTabs = [
  { name: "Dashboard", path: "/" },
  { name: "Experiences", path: "/Experiences" },
  { name: "Resumes", path: "/Resumes" },
];

const navTabs = [
  { name: "Home", path: "/" },
  { name: "About", path: "/About" },
];

const Navbar = () => {
  const [user] = useUser();

  const tabs = user ? userTabs : navTabs;

  return (
    <nav className="sticky top-0 bg-gray-800 shadow-md z-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {tabs.map((tab) => (
              <a
                key={tab.name}
                href={tab.path}
                className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-gray-700 transition duration-150 ease-in-out"
              >
                {tab.name}
              </a>
            ))}
          </div>

          {/* Account Button */}
          <div className="hidden md:flex items-center">
            {user ? (
              <a
                href="/account"
                className="ml-4 px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition duration-150 ease-in-out"
              >
                Account
              </a>
            ) : (
              <a
                href="/signin"
                className="ml-4 px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition duration-150 ease-in-out"
              >
                Sign in
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
