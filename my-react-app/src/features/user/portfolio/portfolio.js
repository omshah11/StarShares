import React from 'react';
import Chart from 'react-apexcharts';
import OwnedStocks from './OwnedStocks';

const Portfolio = () => {
    const chartData = [30, 40, 35, 50, 49, 60, 70, 91, 125];
    const options = {
        chart: {
            id: "basic-line",
            width: "800px", // Change this to the desired width
            height: "400px", // Change this to the desired height
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
        }, 
        series: [
            {
                name: "Series 1",
                data: chartData
            }
        ]
    };

    return (
        <div className='h-full w-full bgcolorSS text-white'>
            
            <div className="m-auto bg-white w-1/2">
                <Chart className="m-auto"options={options} series={options.series} type="line" />
            </div>
            <OwnedStocks className=""/>
            
        </div>
    );
};

export default Portfolio;
