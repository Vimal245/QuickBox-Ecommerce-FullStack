// src/components/WalletModal.jsx
import React from 'react';
import './WalletModal.css';

const WalletModal = ({ isOpen, onClose, walletBalance, totalAmount, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="wallet-modal-overlay">
      <div className="wallet-modal-content">
        <h2>Wallet Balance</h2>
        <p>Available Balance: ₹{walletBalance.toFixed(2)}</p>
        <p>Total Amount: ₹{totalAmount.toFixed(2)}</p>
        <button className="confirm-button" onClick={onConfirm}>Confirm</button>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default WalletModal;
