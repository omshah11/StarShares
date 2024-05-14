import React, {useState, useEffect} from 'react';
import axios from "axios";
import OwnedStocks from './OwnedStocks';
import DonutChart from './DonutChart';
import LineChart from './LineChart';
import BarChart from './BarChart';
import { useDispatch, useSelector } from 'react-redux';
import {selectUser, setOwnedStocksList} from '../userSlice';

const Portfolio = () => {

    const user = useSelector(selectUser);
    const userId = user.user.userId;
    const dispatch = useDispatch();
    const [ownedStocksList, setOwnedStockList] = useState(user.ownedStockList);
    const chartData = [30, 40, 35, 50, 49, 60, 70, 91, 125];

    useEffect(() => {
        getOwnedStockList();
    });
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
    const getOwnedStockList = async () => {
        try {
            const encodedUserId = encodeURIComponent(userId); // URL encode the userId
            const response = await axios.get(
              `http://localhost:5000/api/getOwnedStocks?userId=${encodedUserId}`
            );
            const ownedStockList = response.data.stocks;
            setOwnedStockList(ownedStockList);
            dispatch(
              setOwnedStocksList({
                ownedStockList: ownedStockList,
              })
            );
          } catch (error) {
            console.error("Error fetching owned stocks:", error);
          }
        };

    const userDetails = user.user;
    return (
        <div className=' justify-center px-64 flex flex-col h-full w-full bg-slate-200'>
            <div className=''>
            <div className="mx-5 flex flex-row justify-center items-center">
                <div className='w-1/2'>
                <h1 className="my-10 text-4xl font-semibold text-center">{userDetails.firstName}'s Portfolio</h1>
                <div className="">
                    {/* <LineChart /> */}
                    <BarChart ownedStockList = {ownedStocksList}/>
                </div>
                </div>
                <div className=" mx-5 justify-center items-center w-1/2">
                    <DonutChart ownedStockList = {ownedStocksList} className="" scale="200px"/>
                </div>
            </div>
            </div>
            <div className="mt-8">
                <OwnedStocks />
            </div>
        </div>
    );
};

export default Portfolio;
