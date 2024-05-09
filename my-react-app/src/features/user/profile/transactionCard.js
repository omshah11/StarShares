import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import { useSelector } from 'react-redux';
import { selectUser } from '../userSlice';
import "./profile.css";

const TransactionsCard = () => {
  const [transactions, setTransactions] = useState([]);

  // Function to fetch recent transactions from the backend
  const fetchRecentTransactions = async () => {
    try {
      // Make an HTTP GET request to your backend endpoint
      const response = await axios.get('/api/transactions'); // Replace '/api/transactions' with your actual backend endpoint
      // Assuming the response data is an array of transactions
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchRecentTransactions(); // Fetch recent transactions when the component mounts
  }, []);

  return (
    <div className="transactions">
      <h2>Recent Transactions</h2>
      {transactions.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Stock Name</th>
              <th>Quantity</th>
              <th>Price per Share</th>
              <th>Total Price</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {/* Render the list of recent transactions */}
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.date}</td>
                <td>{transaction.stockName}</td>
                <td>{transaction.quantity}</td>
                <td>{transaction.pricePerShare}</td>
                <td>{transaction.totalPrice}</td>
                <td>{transaction.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>You should buy more stock</p>
      )}
    </div>
  );
};

export default TransactionsCard;
