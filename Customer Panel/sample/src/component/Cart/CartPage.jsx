import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from './CartContext';
import { Typography, Box, Card, CardContent, Button, Divider, CardMedia, IconButton, Grid, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const CartPage = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate(); // Hook to handle navigation

  const handleDelete = (productId) => {
    removeFromCart(productId);
  };

  const handleCheckout = () => {
    navigate('/payment'); // Navigate to the payment page
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#F5EDED', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ marginBottom: '20px', textAlign: 'center', color: '#1254b3' }}>
        <ShoppingCartIcon fontSize="large" /> Your Cart
      </Typography>
      {cart.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: 'center' }}>
          Your cart is empty.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {cart.map((item) => (
            <Grid item xs={12} md={6} key={item.id}>
              <Card sx={{ display: 'flex', alignItems: 'center', position: 'relative', '&:hover': { boxShadow: 4 } }}>
                <CardMedia
                  component="img"
                  alt={item.name}
                  height="140"
                  image={item.image}
                  sx={{ width: 140, borderRadius: '4px' }}
                />
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body1">
                    <strong>Quantity:</strong> {item.quantity}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Price:</strong> ₹{item.price.toFixed(2)}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Total:</strong> ₹{(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </CardContent>
                <Tooltip title="Remove from cart">
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(item.id)}
                    sx={{ position: 'absolute', top: '8px', right: '8px' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      {cart.length > 0 && (
        <>
          <Box sx={{ marginTop: '20px' }}>
            <Divider sx={{ marginBottom: '20px' }} />
            <Typography variant="h6" sx={{ textAlign: 'right', marginBottom: '20px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <span><strong>Total Price:  </strong>₹{calculateTotalPrice()}</span>
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{ backgroundColor: '#054788', width: '100%', padding: '10px 0' }}
              onClick={handleCheckout} // Handle checkout
            >
              Proceed to Checkout
            </Button>
          </Box>

          {/* Bank Offers Section */}
          <Box sx={{ marginTop: '40px', textAlign: 'center' }}>
            <Typography variant="h6" sx={{ marginBottom: '20px', color: '#1254b3' }}>
              Bank Offers
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} md={6}>
                <img src="https://currentaffairs.adda247.com/wp-content/uploads/multisite/sites/5/2023/03/17162901/FrL64WdaEAIiaVx.jpg" alt="Bank Offer 1" style={{ width: '100%', borderRadius: '8px' }} />
              </Grid>
              <Grid item xs={12} md={6}>
                <img src="https://images.dealsmagnet.com/file/dealsmagnet/uploads/shaktimaan/Jiomart_hdfc_bank_offer_january2021.jpg" alt="Bank Offer 2" style={{ width: '100%', borderRadius: '8px', height: '410px' }} />
              </Grid>
            </Grid>
            <Typography variant="body1" sx={{ marginTop: '20px' }}>
              Check out the latest offers and discounts from our partner banks. Apply these offers at checkout to save more!
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CartPage;
