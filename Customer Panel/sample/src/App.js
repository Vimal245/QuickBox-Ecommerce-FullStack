import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../src/component/Login/Login';
import SignupForm from '../src/component/Signup/Signup';
import Home from './component/Home/Home';
import ProductCategory from './component/Product/ProductCategory';
import ProductDetails from './component/Product/ProductDetails';
import GroceryList from './component/Product/GroceryList.jsx';
import FashionList from './component/Product/FashionList.jsx';
import Payment from './component/Payment/Payment.jsx';
import { CartProvider } from './component/Cart/CartContext.jsx';
import CartPage from './component/Cart/CartPage.jsx';
import Wallet from './component/Wallet/Wallet.jsx';
import { WalletProvider } from './component/Wallet/WalletContext.jsx';

const App = () => {
  return (
    <CartProvider>
    <WalletProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/productcategory" element={<ProductCategory />} />
        <Route path="/grocerylist" element={<GroceryList />} />
        <Route path="/fashionlist" element={<FashionList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
    </WalletProvider>
    </CartProvider>
  );
};

export default App;