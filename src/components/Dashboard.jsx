import React from 'react';
import BudgetManagement from './BudgetManagement';

const Dashboard = ({ user }) => {
  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-bold text-center">Welcome, {user.name}!</h2>
      <p className="text-center text-gray-700">
        This is your personalized dashboard. Manage your budget, view your transactions, and check analytics.
      </p>
      <BudgetManagement user={user} />
    </div>
  );
};

export default Dashboard;