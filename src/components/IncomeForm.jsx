import React, { useState } from 'react';

const IncomeForm = ({ addIncome }) => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !date || !category) {
      setError('All fields are required.');
      return;
    }
    const entry = {
      id: Date.now(),
      amount,
      date,
      category
    };
    addIncome(entry);
    setAmount('');
    setDate('');
    setCategory('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-4 border rounded-md bg-gray-50">
      <h2 className="text-xl font-semibold text-center">Add Income</h2>
      {error && <div className="text-red-500 text-center">{error}</div>}
      <div>
        <label className="block font-medium mb-1">Amount (₹):</label>
        <input 
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          className="w-full border p-2 rounded" 
          placeholder="Enter amount" 
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Date:</label>
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          className="w-full border p-2 rounded" 
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Category:</label>
        <input 
          type="text" 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
          className="w-full border p-2 rounded" 
          placeholder="e.g., Salary, Freelance" 
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Add Income
      </button>
    </form>
  );
};

export default IncomeForm;