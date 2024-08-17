import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import CartContext from '../Cart/CartContext';
import './FashionList.css';

const FashionList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleProducts, setVisibleProducts] = useState(8); // Number of products to display initially
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/fashion');
        setProducts(response.data);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleBuyNow = (product, quantity) => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  const handleQuantityChange = (productId, quantity) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, quantity } : product
      )
    );
  };

  const handleLoadMore = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 6); // Increase by two rows (each row has 3 products)
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='products-section'>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#1254b3' }}>Products List</h1>
        <div className="products-grid">
          {products.slice(0, visibleProducts).map((product) => (
            <div className="product-card" key={product.id}>
              <Link to={`/product/${product.id}`} className="product-link">
                <div className="product-photo">
                  <img src={product.image} alt={product.product_name} />
                </div>
                <div className="product-info">
                  <h3>{product.product_name}</h3>
                  <p>Weight: {product.weight}</p>
                  <p>₹{product.price.toFixed(2)}</p>
                  <p>Discount: {product.discount}%</p>
                  <p>Rating: {product.rating} / 5</p>
                  <p>{product.description}</p>
                </div>
              </Link>
              <div className="quantity-section">
                <input
                  type="number"
                  min="1"
                  value={product.quantity || 1}
                  onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                />
                <button
                  className="add-to-cart-button"
                  onClick={() => handleBuyNow(product, product.quantity || 1)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
        {visibleProducts < products.length && (
          <div className="load-more-section">
            <button className="load-more-button" onClick={handleLoadMore}>
              Load More
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default FashionList;
