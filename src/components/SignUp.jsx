import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import bcrypt from 'bcryptjs';

const SignUp = ({ setUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('Please fill all fields.');
      return;
    }

    // Get already registered users (if any)
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    if (existingUsers.find((user) => user.email === email)) {
      setError('This email is already registered.');
      return;
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = { id: Date.now(), name, email, password: hashedPassword };
    const updatedUsers = [...existingUsers, newUser];

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSignUp} className="space-y-5">
        <div>
          <label className="block mb-2 font-semibold">Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-green-500" 
            placeholder="Your full name" 
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-green-500" 
            placeholder="you@example.com" 
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-green-500" 
            placeholder="Create a password" 
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 rounded"
        >
          Sign Up
        </button>
      </form>
      <p className="mt-6 text-center">
        Already registered?{' '}
        <Link to="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignUp;