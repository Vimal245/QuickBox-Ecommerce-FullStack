import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import ProductDetails from '../Product/ProductDetails';
import './Home.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import TopCarousel from './Carousel'; // Adjust the import path as necessary


// Sample product data for multiple rows
const products = [
  { id: 1, name: 'Men Regul..', price: 329, image: 'n4.jpg', category: 'Trendy Dresses' },
  { id: 2, name: 'Product 2', price: 219, image: 'n6.jpg', category: 'Trendy Dresses' },
  { id: 3, name: 'Product 3', price: 139.99, image: 'f1.jpg', category: 'Trendy Dresses' },
  { id: 4, name: 'Product 4', price: 249.99, image: 'f4.jpg', category: 'Trendy Dresses' },
  { id: 5, name: 'Product 5', price: 1449.99, image: 'watch.jpg', category: 'Featured Products' },
  { id: 6, name: 'Product 6', price: 1229.99, image: 'buds.jpg', category: 'Featured Products' },
  { id: 7, name: 'Product 7', price: 18569.99, image: 'phn.jpg', category: 'Featured Products' },
  { id: 8, name: 'Product 8', price: 779.99, image: 'speaker.jpg', category: 'Featured Products' },
  { id: 9, name: 'Product 9', price: 889.99, image: 'shelf.jpg', category: 'New Arrivals' },
  { id: 10, name: 'Product 10', price: 299.99, image: 'book.jpg', category: 'New Arrivals' },
  { id: 11, name: 'Product 11', price: 109.99, image: 'pen.jpg', category: 'New Arrivals' },
  { id: 12, name: 'Product 12', price: 119.99, image: 'pouch.jpg', category: 'New Arrivals' },
  { id: 13, name: 'Product 13', price: 86, image: 'gro1.jpg', category: 'Fresh Groceries' },
  { id: 14, name: 'Product 14', price: 98, image: 'gro2.jpg', category: 'Fresh Groceries' },
  { id: 15, name: 'Product 15', price: 28, image: 'gro3.jpg', category: 'Fresh Groceries' },
  { id: 16, name: 'Product 16', price: 106, image: 'gro4.jpg', category: 'Fresh Groceries' },
];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const getFilteredProducts = () => {
    let filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filter === 'priceLowToHigh') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (filter === 'priceHighToLow') {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  const categorizedProducts = filteredProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});
  return (
    <div className='home-bg'>
      <Navbar />
      <TopCarousel />
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <TextField
          label="Search Products"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ marginRight: '10px' }}
        />
        <FormControl variant="outlined" style={{ minWidth: 200 }}>
          <InputLabel>Filter By</InputLabel>
          <Select
            value={filter}
            onChange={handleFilterChange}
            label="Filter By"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
            <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
          </Select>
        </FormControl>
      </div>
      {Object.keys(categorizedProducts).map((category, index) => (
        <div key={index} style={{ marginTop: '40px' }}>
          <h1 style={{ textAlign: 'center', color:'#4672B1'}}>{category}</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
            {categorizedProducts[category].map((product) => (
              <Card
                key={product.id}
                sx={{
                  maxWidth: 345,
                  padding: '15px',
                  margin: '10px',
                  backgroundColor: '#9FBFDF',
                  '&:hover': {
                    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                    transform: 'translateY(-10px)',
                    transition: 'all 0.3s ease-in-out',
                    padding: '20px',
                  },
                }}
              >
                  <CardMedia
                    component="img"
                    height="140"
                    image={product.image}
                    alt={product.name}
                    className='product-image'
                  />
                  <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" color="#235CAE">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ₹{product.price.toFixed(2)}
                    </Typography>
                  </CardContent>
                  </Link>
                  <CardActions>
                    <IconButton aria-label="add to favorites" className='favorite-button'>
                      <FavoriteIcon />
                    </IconButton>
                    <Button size='large' onClick={ProductDetails.handlebuynow}>
                      Add to Cart
                    </Button>
                  </CardActions>
              </Card>
            ))}
          </div>
        </div>
      ))}
      <section className="sec" id="about-us">
        <h2>About Us</h2>
        <div className='contain'>
          <div className='content'>
            <h3>Who are we?</h3>
            <p>
              Our mission is to provide the best quality products to our customers. We aim to provide a seamless shopping experience to our customers.
              QuickBox connects customers with local stores for fast and convenient delivery of a wide range of products. Unlike traditional models, QuickBox ensures faster and more reliable service by enabling local stores to handle their own deliveries directly to customers. Experience the future of local shopping with QuickBox's efficient and customer-centric approach. QuickBox offers a seamless online shopping experience with an intuitive platform where customers can browse, order, and track their deliveries in real-time. With QuickBox, local businesses gain a competitive edge, and customers enjoy quick access to their favorite products without the wait. Trust QuickBox to deliver not just products, but satisfaction and convenience right to your doorstep.
            </p>
          </div>
          <div className='content-vec'>
            <img src={`${process.env.PUBLIC_URL}/About img.png`} alt="Vector" />
          </div>
        </div>
      </section>
      <section className="sec" id="contact-us">
        <h2>Contact Us</h2>
        <div className='contain'>
          <div className='content'>
            <p>
              <b>Address: </b>Thika town, Naltex building, 2nd floor<br />
              <b>Phone: </b>Call us at +91 9999 8888<br />
              <b>Hours: </b>From 8 a.m To 6 p.m<br /><br />
              <i>We'd love to hear from you! Whether you have questions about our services, need assistance with an order, or simply want to provide feedback, we're here to help.
              At QuickBox, customer satisfaction is our top priority.</i>
            </p>
          </div>
          <div className='content-vec'>
            <img src={`${process.env.PUBLIC_URL}/Contact.png`} alt="Vector" />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
