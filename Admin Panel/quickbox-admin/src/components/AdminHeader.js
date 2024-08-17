import React from 'react';
import '../css/AdminHeader.css';
import logo from '../assets/logo.png'; // Adjusted import path

const AdminHeader = () => {
  return (
    <header className="admin-header">
      <img src={logo} alt="Logo" className="logo" style={{ width: 40, height: 40, marginRight: 16 }} />
      <h1>QuickBox Management</h1>
    </header>
  );
};

export default AdminHeader;
