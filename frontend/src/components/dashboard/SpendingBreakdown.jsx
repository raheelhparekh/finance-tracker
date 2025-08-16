import React from 'react';
import { Pie } from 'react-chartjs-2';

const SpendingBreakdown = ({ expensesByCategory }) => {
  const chartData = {
    labels: Object.keys(expensesByCategory),
    datasets: [{
      data: Object.values(expensesByCategory),
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9933'
      ],
      hoverBackgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9933'
      ],
    }],
  };
  
  const chartOptions = {
    plugins: {
      legend: {
        position: 'top',
      },
    },
    maintainAspectRatio: false,
  };

  const totalExpenses = Object.values(expensesByCategory).reduce((sum, amount) => sum + amount, 0);

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h3 className="card-title text-2xl">Spending Breakdown</h3>
        <div className="mt-4" style={{ height: '300px' }}>
          {totalExpenses > 0 ? (
            <Pie data={chartData} options={chartOptions} />
          ) : (
            <div className="text-center text-gray-500">No expenses to display chart.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpendingBreakdown;