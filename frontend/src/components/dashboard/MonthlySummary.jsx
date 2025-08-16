import React from 'react';

const MonthlySummary = ({ totalIncome, totalExpenses, netSavings }) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h3 className="card-title text-2xl">Monthly Summary</h3>
        <div className="stats stats-vertical lg:stats-horizontal shadow w-full mt-4">
          <div className="stat">
            <div className="stat-title">Total Income</div>
            <div className="stat-value text-success">${totalIncome.toFixed(2)}</div>
            <div className="stat-desc">All time</div>
          </div>
          
          <div className="stat">
            <div className="stat-title">Total Expenses</div>
            <div className="stat-value text-error">${totalExpenses.toFixed(2)}</div>
            <div className="stat-desc">All time</div>
          </div>
          
          <div className="stat">
            <div className="stat-title">Net Savings</div>
            <div className="stat-value">${netSavings.toFixed(2)}</div>
            <div className="stat-desc">Remaining balance</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlySummary;