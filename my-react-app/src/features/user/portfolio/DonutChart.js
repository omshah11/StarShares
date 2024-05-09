import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const DonutChart = ({ ownedStockList }) => {
  // Extracting stock names and values from portfolioData
  const labels = ownedStockList.map(stock => stock.artistName);
  const dataValues = ownedStockList.map(stock => stock.cost);

  const data = {
    labels: labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          // Add more colors if needed
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          // Add more colors if needed
        ],
        borderWidth: 5,
      },
    ],
  };

  return (
    <div className='bg-white mx-2 border-2 border-gray-600 drop-shadow-md rounded-xl'>
      <div className='flex flex-col justify-center px-auto'>
        <h2 className='w-full h-full flex justify-center items-center text-xl font-semibold my-4'>Individual Owned Stock Breakdown</h2>
        <div className='min-w-full min-h-full flex flex-grow'>
          <Doughnut className='flex justify-center mx-5 my-5' data={data} />
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
