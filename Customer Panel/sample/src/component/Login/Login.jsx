import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import yourImage from 'file:///C:/Users/LENOVO/Downloads/Group%2012 1.svg';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setName(data.name);
        console.log('Login successful:', data);
        setOpen(true); // Show success alert
        setTimeout(() => navigate('/home'), 2000); // Navigate after showing the alert
      } else {
        const data = await response.json();
        setError(data.message || 'Invalid email or password');
        setOpen(true); // Show error alert
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to fetch. Please check your network and backend server.');
      setOpen(true); // Show error alert
    }
  };

  return (
    <div className='login-bg'>
      <Navbar />
      <div className="login-container">
        <div className="login-border-container">
          <div className="login-form">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" style={{ color: 'white', textDecoration: 'none' }}>Login</button>
            </form>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity={error ? "error" : "success"} sx={{ width: '100%' }}>
                {error ? error : `Welcome ${name}`}
              </Alert>
            </Snackbar>
            <p>Don't have an Account? <Link to="/signup" className="signup-link">Signup</Link></p>
          </div>
          <div className="image-container">
            <img src={yourImage} alt="Description" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
