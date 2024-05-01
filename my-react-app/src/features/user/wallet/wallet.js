import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Wallet = () => {
  // State to store user's balance
  const [balance, setBalance] = useState(0);

  // Fetch user's balance from the server when the component mounts
  useEffect(() => {
    fetchBalance();
  }, []);

  // Function to fetch user's balance from the server
  const fetchBalance = async () => {
    try {
      const response = await axios.get('/api/wallet/balance');
      setBalance(response.data.balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  // Function to handle depositing funds into the wallet
  const depositFunds = async (amount) => {
    try {
      await axios.post('/api/wallet/deposit', { amount });
      // After successful deposit, fetch updated balance
      fetchBalance();
    } catch (error) {
      console.error('Error depositing funds:', error);
    }
  };

  return (
    <div>
      <h2>Wallet</h2>
      <p>Current Balance: ${balance}</p>
      <button onClick={() => depositFunds(100)}>Deposit $100</button>
      <button onClick={() => depositFunds(500)}>Deposit $500</button>
      {/* Add more deposit options as needed */}
    </div>
  );
};

export default Wallet;
