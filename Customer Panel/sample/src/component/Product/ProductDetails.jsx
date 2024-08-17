import React, { useState, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Button, IconButton, Divider, Box, TextField, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CartContext from '../Cart/CartContext';

// Sample product data
const productData = [
  {
    id: 1,
    name: 'Men Regular Fit Printed Spread Collar Casual Shirt',
    price: 329,
    image: '/n4.jpg',
    additionalImages: ['/n4(1).jpg', '/n4(2).jpg', '/n4(3).jpg', '/n4(4).jpg', '/n4(5).jpg', '/n4(6).jpg'], // Additional images
    description: 'This garment for the upper body, typically made from fabric such as cotton, polyester, or linen. It generally features a collar, sleeves, and a front opening with buttons or a zipper. Shirts come in various styles and fits, including dress shirts, casual shirts, and T-shirts, catering to different occasions and preferences.',
    reviews: [
      { user: 'Alice', comment: 'Great product!', rating: 4 },
      { user: 'Bob', comment: 'Value for money.', rating: 5 },
    ],
    additionalDetails: {
      size: 'S M L XL',
      delivery: 'Friday',
      manufacturer: 'Tyzlo',
    },
  },
  // Add other products similarly
  // ... (same format as above)
];

// Sample related products data
const relatedProducts = [
  {
    id: 2,
    name: 'Men Regular Half Sleeve',
    price: 249,
    image: '/related1.jpg',
  },
  {
    id: 3,
    name: 'Men Regular Half Sleeve',
    price: 219,
    image: '/related2.jpg',
  },
  {
    id: 4,
    name: 'Men Regular Half Sleeve',
    price: 239,
    image: '/related3.jpg',
  },
  {
    id: 5,
    name: 'Men Regular Half Sleeve',
    price: 259,
    image: '/related4.jpg',
  },
  {
    id: 6,
    name: 'Men Regular Half Sleeve',
    price: 225,
    image: '/related5.jpg',
  },
  {
    id: 7,
    name: 'Men Regular Half Sleeve',
    price: 235,
    image: '/related6.jpg',
  },
];

const ProductDetails = () => {
  const { id } = useParams();
  const product = productData.find((p) => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext); 

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#F5EDED' }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}>
        {/* Left Side: Small Images */}
        <Box sx={{ display: 'flex', flexDirection: 'column', marginRight: '20px' }}>
          {product.additionalImages.map((img, index) => (
            <Card key={index} sx={{ marginBottom: '10px', maxWidth: 100 }}>
              <CardMedia component="img" height="100" image={img} alt={`Additional ${index}`} />
            </Card>
          ))}
        </Box>

        {/* Right Side: Product Details and Related Products */}
        <Box sx={{ flex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            {/* Product Details */}
            <Box sx={{ flex: 2 }}>
              <Card sx={{ maxWidth: 600, marginBottom: '20px' }}>
                <CardMedia component="img" height="400" image={product.image} alt={product.name} />
                <CardContent sx={{ backgroundColor: '#A8C5E1', color: '#054788' }}>
                  <Typography gutterBottom variant="h4" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="h6">
                    ₹{product.price.toFixed(2)}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {product.description}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Available sizes:</strong> {product.additionalDetails.size}
                    <br />
                    <strong>Manufacturer:</strong> {product.additionalDetails.manufacturer}
                    <br />
                    <strong>Delivery by:</strong> {product.additionalDetails.delivery}
                  </Typography>
                </CardContent>
              </Card>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                <TextField
                  label="Quantity"
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  inputProps={{ min: 1 }}
                  sx={{ maxWidth: 100 }}
                />
                <Button
                  variant="contained"
                  size="large"
                  style={{ backgroundColor: '#054788' }}
                  onClick={handleBuyNow}
                >
                  Add to Cart
                </Button>
                <Button variant="contained" color="secondary" size="large" >
                  Buy Now
                </Button>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
              </Box>
              <Divider style={{ margin: '20px 0' }} />
              <Typography variant="h6" style={{ marginBottom: '10px' }}>
                Reviews:
              </Typography>
              <Box sx={{ display: 'flex', overflowX: 'auto', paddingBottom: '20px' }}>
                {product.reviews.length > 0 ? (
                  product.reviews.map((review, index) => (
                    <Box
                      key={index}
                      sx={{
                        minWidth: 300,
                        padding: '10px',
                        marginRight: '10px',
                        backgroundColor: '#fff',
                        borderRadius: '5px',
                        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
                      }}
                    >
                      <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                        {review.user}:
                      </Typography>
                      <Typography variant="body2">{review.comment}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Rating: {review.rating} / 5
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2">No reviews yet.</Typography>
                )}
              </Box>
            </Box>

            {/* Related Products */}
            <Box sx={{ flex: 2, marginLeft: '20px' }}>
              <Typography variant="h6" style={{ marginBottom: '10px' }}>
                Related Products:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {relatedProducts.map((relatedProduct) => (
                  <Box key={relatedProduct.id} sx={{ width: 'calc(33% - 20px)', position: 'relative' }}>
                    <Card sx={{ backgroundColor: '#A8C5E1', color: '#054788' }}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={relatedProduct.image}
                        alt={relatedProduct.name}
                      />
                      <CardContent>
                        <Typography variant="h6" noWrap>
                          {relatedProduct.name}
                        </Typography>
                        <Typography variant="body2">₹{relatedProduct.price.toFixed(2)}</Typography>
                      </CardContent>
                      <Button
                        component={Link}
                        to={`/product/${relatedProduct.id}`}
                        size="small"
                        sx={{
                          position: 'absolute',
                          bottom: '10px',
                          right: '10px',
                          backgroundColor: '#054788',
                          color: '#fff',
                        }}
                      >
                        View
                      </Button>
                    </Card>
                  </Box>
                ))}
              </Box>
            </Box>
          </div>
          <Divider style={{ margin: '20px 0' }} />
        </Box>
      </div>
    </div>
  );
};

export default ProductDetails;
