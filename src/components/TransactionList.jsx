import React from 'react';

const TransactionList = ({ income, expenses, deleteIncome, deleteExpense }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-center mb-2">Income History</h2>
        {income.length === 0 ? (
          <p className="text-center text-gray-600">No income transactions available.</p>
        ) : (
          <ul className="space-y-2">
            {income.map(item => (
              <li key={item.id} className="flex justify-between items-center p-2 border rounded">
                <span>{item.category}: ₹{item.amount} on {item.date}</span>
                <button onClick={() => deleteIncome(item.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-center mb-2">Expense History</h2>
        {expenses.length === 0 ? (
          <p className="text-center text-gray-600">No expense transactions available.</p>
        ) : (
          <ul className="space-y-2">
            {expenses.map(item => (
              <li key={item.id} className="flex justify-between items-center p-2 border rounded">
                <span>{item.category}: ₹{item.amount} on {item.date}</span>
                <button onClick={() => deleteExpense(item.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TransactionList;