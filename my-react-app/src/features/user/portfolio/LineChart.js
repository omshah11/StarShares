import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';

const LineChart = () => {
  // Data for the line chart
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80, 81, 56, 55, 40], // Example data points
        fill: false, // No fill color beneath the line
        borderColor: 'rgb(75, 192, 192)', // Line color
        tension: 0.1, // Line tension (0 for straight lines)
      },
    ],
  };

  return (
    <div className='bg-white mx-2 mr-10 border-2 border-gray-600 rounded-xl drop-shadow-md justify-center items-center '>
    <div className="flex flex-col justify-center px-auto">
      <h2 className="flex justify-center text-xl font-semibold my-4">Overall Stock Performance</h2>
      <div className="min-w-full min-h-full w-1/2 h-1/2 flex flex-grow">
        <Line className='mx-5 my-5' data={data} />
      </div>
    </div>
    </div>
  );
};

export default LineChart;

