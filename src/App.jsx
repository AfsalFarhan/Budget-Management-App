import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';

const App = () => {
  const [user, setUser] = useState(null);

  // Load current logged in user from localStorage
  useEffect(() => {
    const currentUser = localStorage.getItem('user');
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Enhanced header with gradient and responsive design */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex flex-wrap justify-between items-center">
          <Link to="/" className="text-3xl font-extrabold text-white tracking-wide transition-all duration-300 hover:scale-105">
            Budget Tracker
          </Link>
          <nav className="mt-2 md:mt-0">
            {user ? (
              <div className="flex space-x-4 items-center">
                <span className="text-gray-200 text-lg">Hi, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition transform hover:scale-105"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition transform hover:scale-105"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition transform hover:scale-105"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Main content area with container and spacing */}
      <main className="container mx-auto my-8 flex-grow px-4">
        <Routes>
          <Route
            path="/"
            element={user ? <Dashboard user={user} /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" replace /> : <Login setUser={setUser} />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" replace /> : <SignUp setUser={setUser} />}
          />
        </Routes>
      </main>

      {/* Footer to improve navigation and UX */}
      <footer className="bg-gray-200 shadow-inner">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Budget Tracker. Made with ❤️ using React and Tailwind CSS.
        </div>
      </footer>
    </div>
  );
};

export default App;