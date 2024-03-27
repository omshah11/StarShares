import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarChart = () => {
  const chartRef = useRef(null);
  const myChartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (myChartRef.current) {
      myChartRef.current.destroy(); // Destroy existing chart instance if it exists
    }

    myChartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: 'My First Dataset',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    return () => {
      if (myChartRef.current) {
        myChartRef.current.destroy(); // Cleanup chart instance when component unmounts
      }
    };
  }, []);

  return (
    <div className='bg-white mx-2 mr-10 border-2 border-gray-600 rounded-xl drop-shadow-md justify-center items-center mt-4'>
      <div className="flex flex-col justify-center px-auto">
        <h2 className="flex justify-center text-xl font-semibold my-4">Bar Chart Example</h2>
        <div className="min-w-full min-h-full w-1/2 h-1/2 flex flex-grow">
          <canvas ref={chartRef} />
        </div>
      </div>
    </div>
  );
};

export default BarChart;
