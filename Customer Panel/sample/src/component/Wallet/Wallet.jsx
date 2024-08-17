// src/components/Wallet/Wallet.js
import React, { useContext } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { WalletContext } from './WalletContext';

const Wallet = () => {
  const { balance, transactions, addTransaction } = useContext(WalletContext);

  const handleButtonClick = (action) => {
    console.log(action);
    // Example transaction logic - update as needed
    if (action === 'addMoney') {
      addTransaction({ id: Date.now(), date: new Date().toISOString().split('T')[0], amount: 1000.00, description: 'Added Money' });
    }
  };

  return (
    <div className='wallet' style={{ backgroundColor: '#F5EDED', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Wallet</h1>
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>Available Balance</h2>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>₹{balance.toFixed(2)}</p>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <button 
              onClick={() => handleButtonClick('withdraw')}
              style={{ padding: '10px 20px', fontSize: '16px', border: 'none', borderRadius: '4px', backgroundColor: '#4CAF50', color: '#fff', cursor: 'pointer' }}
            >
              Withdraw
            </button>
            <button 
              onClick={() => handleButtonClick('send')}
              style={{ padding: '10px 20px', fontSize: '16px', border: 'none', borderRadius: '4px', backgroundColor: '#2196F3', color: '#fff', cursor: 'pointer' }}
            >
              Send
            </button>
            <button 
              onClick={() => handleButtonClick('cards')}
              style={{ padding: '10px 20px', fontSize: '16px', border: 'none', borderRadius: '4px', backgroundColor: '#FFC107', color: '#fff', cursor: 'pointer' }}
            >
              Cards
            </button>
            <button 
              onClick={() => handleButtonClick('addMoney')}
              style={{ padding: '10px 20px', fontSize: '16px', border: 'none', borderRadius: '4px', backgroundColor: '#FF5722', color: '#fff', cursor: 'pointer' }}
            >
              Add Money
            </button>
          </div>
          
          <h2 style={{ marginTop: '30px' }}>Transaction History</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {transactions.map(transaction => (
              <li key={transaction.id} style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Date: {transaction.date}</span>
                  <span>Amount: ₹{transaction.amount.toFixed(2)}</span>
                </div>
                <div>Description: {transaction.description}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Wallet;
