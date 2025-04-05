import React, { useState, useEffect } from 'react';
import IncomeForm from './IncomeForm';
import ExpenseForm from './ExpenseForm';
import TransactionList from './TransactionList';
import Chart from './Chart';

const BudgetManagement = ({ user }) => {
  const [activeTab, setActiveTab] = useState('income');
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);

  // Load user-specific data from localStorage
  useEffect(() => {
    const savedIncome = JSON.parse(localStorage.getItem(`income_${user.id}`)) || [];
    const savedExpenses = JSON.parse(localStorage.getItem(`expenses_${user.id}`)) || [];
    setIncome(savedIncome);
    setExpenses(savedExpenses);
  }, [user.id]);

  // Persist user-specific data to localStorage
  useEffect(() => {
    localStorage.setItem(`income_${user.id}`, JSON.stringify(income));
  }, [income, user.id]);

  useEffect(() => {
    localStorage.setItem(`expenses_${user.id}`, JSON.stringify(expenses));
  }, [expenses, user.id]);

  const addIncome = (entry) => {
    setIncome([...income, entry]);
  };

  const addExpense = (entry) => {
    setExpenses([...expenses, entry]);
  };

  const deleteIncome = (id) => {
    setIncome(income.filter((item) => item.id !== id));
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((item) => item.id !== id));
  };

  const totalIncome = income.reduce((sum, item) => sum + Number(item.amount), 0);
  const totalExpenses = expenses.reduce((sum, item) => sum + Number(item.amount), 0);
  const netBalance = totalIncome - totalExpenses;

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow rounded-md">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-center">Budget Management (₹)</h1>
        <div className="flex justify-around mt-4">
          <div className="text-center">
            <span className="block text-lg font-semibold">Income</span>
            <span className="text-green-600">₹{totalIncome}</span>
          </div>
          <div className="text-center">
            <span className="block text-lg font-semibold">Expenses</span>
            <span className="text-red-600">₹{totalExpenses}</span>
          </div>
          <div className="text-center">
            <span className="block text-lg font-semibold">Net</span>
            <span className={netBalance >= 0 ? "text-green-600" : "text-red-600"}>₹{netBalance}</span>
          </div>
        </div>
      </header>

      <nav className="border-b mb-4">
        <ul className="flex space-x-4 justify-center">
          <li>
            <button
              onClick={() => setActiveTab('income')}
              className={`py-2 px-4 ${activeTab === 'income' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
            >
              Income
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('expenses')}
              className={`py-2 px-4 ${activeTab === 'expenses' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
            >
              Expenses
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('history')}
              className={`py-2 px-4 ${activeTab === 'history' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
            >
              History
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-2 px-4 ${activeTab === 'analytics' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
            >
              Analytics
            </button>
          </li>
        </ul>
      </nav>

      <main className="tab-content">
        {activeTab === 'income' && <IncomeForm addIncome={addIncome} />}
        {activeTab === 'expenses' && <ExpenseForm addExpense={addExpense} />}
        {activeTab === 'history' && (
          <TransactionList 
            income={income} 
            expenses={expenses} 
            deleteIncome={deleteIncome} 
            deleteExpense={deleteExpense} 
          />
        )}
        {activeTab === 'analytics' && (
          <div className="p-4">
            <Chart expenses={expenses} />
          </div>
        )}
      </main>
    </div>
  );
};

export default BudgetManagement;