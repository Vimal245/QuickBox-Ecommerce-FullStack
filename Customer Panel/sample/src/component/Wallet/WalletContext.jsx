// src/context/WalletContext.js
import React, { createContext, useState } from 'react';

const WalletContext = createContext();

const WalletProvider = ({ children }) => {
  const [balance, setBalance] = useState(12050.00); // Initial balance in rupees
  const [transactions, setTransactions] = useState([
    { id: 1, date: '2024-08-01', amount: -2000.00, description: 'Purchase at Store A' },
    { id: 2, date: '2024-07-30', amount: 5000.00, description: 'Deposit' },
    { id: 3, date: '2024-07-25', amount: -1000.00, description: 'Purchase at Store B' },
    // Add more transactions here
  ]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
    setBalance(balance + transaction.amount);
  };

  return (
    <WalletContext.Provider value={{ balance, transactions, addTransaction }}>
      {children}
    </WalletContext.Provider>
  );
};

export { WalletContext, WalletProvider };
