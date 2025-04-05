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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-black shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-white">
            Budget Tracker
          </Link>
          <nav>
            {user ? (
              <div className="flex space-x-4 items-center">
                <span className="text-gray-200">Hi, {user.name}</span>
                <button 
                  onClick={handleLogout} 
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded">
                  Login
                </Link>
                <Link to="/signup" className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded">
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        </div>
      </header>

      <main className="container mx-auto my-8 px-4">
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
    </div>
  );
};

export default App;