// src/components/Payment/Payment.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Payment.css';
import Modal from './Modal';
import WalletModal from '../Wallet/WalletModal';
import mastercard from '../../Assets/card.png';
import visa from '../../Assets/visa.png';
import americanExpress from '../../Assets/american-express.png';
import maestro from '../../Assets/payment.png';
import bajaj from '../../Assets/bajaj-finserv.svg';
import rupay from '../../Assets/bank.png';
import CartContext from '../Cart/CartContext'; // Import CartContext
import { WalletContext } from '../Wallet/WalletContext'; // Import WalletContext

const Payment = () => {
  const [address, setAddress] = useState('123 Main St, City, State, 12345');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false); // State for wallet modal
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [showThankYouMessage, setShowThankYouMessage] = useState(false);

  const navigate = useNavigate();
  const { cart } = useContext(CartContext); // Access cart context
  const { balance } = useContext(WalletContext); // Access wallet balance from WalletContext

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0); // Calculate total amount

  const handleAddressChange = () => {
    const newAddress = prompt('Enter new address:');
    if (newAddress) {
      setAddress(newAddress);
    }
  };

  const handlePaymentChange = (e) => {
    const selectedMethod = e.target.value;
    setPaymentMethod(selectedMethod);
    if (selectedMethod !== 'Cash on Delivery') {
      setIsModalOpen(true);
    } else {
      setPaymentDetails('');
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = () => {
    setIsModalOpen(false);
    // Add your form submission logic here
    alert('Payment details submitted!');
  };

  const handleWalletRedirect = () => {
    setIsWalletModalOpen(true); // Open wallet modal
  };

  const handleWalletModalClose = () => {
    setIsWalletModalOpen(false); // Close wallet modal
  };

  const handleWalletConfirm = () => {
    setIsWalletModalOpen(false); // Close wallet modal and proceed with wallet payment
    // Add your wallet payment logic here
    alert('Payment confirmed from wallet!');
  };

  const handlePlaceOrder = () => {
    // Add order placing logic here
    setIsOrderPlaced(true);
    setShowThankYouMessage(true);
    setTimeout(() => {
      setShowThankYouMessage(false);
      navigate('/home'); // Redirect to the home page
    }, 3000); // Show the message for 3 seconds
  };

  return (
    <div className='payment-bg'>
      <div className="payment-container">
        <div className="address-container">
          <h1>Shipping Details</h1>
          <div className="address-box">
            <p>{address}</p>
            <button onClick={handleAddressChange}>Change Address</button>
          </div>
        </div>
        <div className="payment-method-container">
          <h3>Select a payment method</h3>
          <div className="payment-options">
            <label>
              <input
                type="radio"
                value="Credit Card"
                checked={paymentMethod === 'Credit Card'}
                onChange={handlePaymentChange}
              />
              Credit Card or Debit Card
              <div className="card-icons">
                <img src={mastercard} alt="Mastercard" className="custom-icon" />
                <img src={visa} alt="Visa" className="custom-icon" />
                <img src={americanExpress} alt="American Express" className="custom-icon" />
                <img src={maestro} alt="Maestro" className="custom-icon" />
                <img src={bajaj} alt="Bajaj" className="custom-icon" />
                <img src={rupay} alt="RuPay" className="custom-icon" />
              </div>
            </label>
            <label>
              <input
                type="radio"
                value="UPI"
                checked={paymentMethod === 'UPI'}
                onChange={handlePaymentChange}
              />
              UPI
            </label>
            <label>
              <input
                type="radio"
                value="Cash on Delivery"
                checked={paymentMethod === 'Cash on Delivery'}
                onChange={handlePaymentChange}
              />
              Cash on Delivery
            </label>
          </div>
        </div>
        <div className="place-order-container">
          <button className="wallet-button" onClick={handleWalletRedirect}>
            Proceed with Wallet
          </button>
          <button className="place-order-button" onClick={handlePlaceOrder}>Place Order</button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleModalClose} title={paymentMethod} onSubmit={handleModalSubmit}>
        {paymentMethod === 'Credit Card' && (
          <div className="credit-card-details">
            <div className="left-side">
              <label>
                Card Number
                <input type="text" placeholder="Enter Card Number" />
              </label>
              <label>
                Nickname
                <input type="text" placeholder="Enter Nickname" />
              </label>
              <label>
                Expiry Date
                <input type="month" placeholder="MM/YY" />
              </label>
            </div>
            <div className="vertical-divider"></div>
            <div className="right-side">
              <p>Please ensure that you enable your card for online payments from your bank’s app.</p>
              <div className="card-icons">
                <img src={mastercard} alt="Mastercard" className="custom-icon" />
                <img src={visa} alt="Visa" className="custom-icon" />
                <img src={americanExpress} alt="American Express" className="custom-icon" />
                <img src={maestro} alt="Maestro" className="custom-icon" />
                <img src={bajaj} alt="Bajaj" className="custom-icon" />
                <img src={rupay} alt="RuPay" className="custom-icon" />
              </div>
            </div>
          </div>
        )}
        {paymentMethod === 'UPI' && (
          <div>
            <label>
              Enter UPI ID
              <input type="text" placeholder="Enter UPI ID" />
            </label>
          </div>
        )}
      </Modal>

      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={handleWalletModalClose}
        walletBalance={balance}
        totalAmount={totalAmount}
        onConfirm={handleWalletConfirm}
      />

      {isOrderPlaced && (
        <div className={`thank-you-message ${showThankYouMessage ? 'show' : ''}`}>
          <p>Thank you for your order!</p>
        </div>
      )}
    </div>
  );
};

export default Payment;
