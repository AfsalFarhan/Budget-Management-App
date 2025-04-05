import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import bcrypt from 'bcryptjs';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Both email and password are required.');
      return;
    }
    
    // Retrieve registered users from localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('users')) || [];
    const matchedUser = registeredUsers.find(
      (user) => user.email === email
    );

    if (matchedUser && bcrypt.compareSync(password, matchedUser.password)) {
      localStorage.setItem('user', JSON.stringify(matchedUser));
      setUser(matchedUser);
      navigate('/');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="block mb-2 font-semibold">Username or Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500" 
            placeholder="you@example.com" 
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500" 
            placeholder="Your password" 
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 rounded"
        >
          Login
        </button>
      </form>
      <p className="mt-6 text-center">
        Don't have an account?{' '}
        <Link to="/signup" className="text-blue-500 hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;