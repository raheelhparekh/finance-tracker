import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const IncomeExpenseChart = ({ transactions }) => {
  // Calculate total income and expenses
  const totals = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'income') {
        acc.income += transaction.amount;
      } else {
        acc.expense += transaction.amount;
      }
      return acc;
    },
    { income: 0, expense: 0 }
  );

  const data = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        label: 'Amount ($)',
        data: [totals.income, totals.expense],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgb(75, 192, 192)', 'rgb(255, 99, 132)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Income vs Expense Comparison',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default IncomeExpenseChart;
