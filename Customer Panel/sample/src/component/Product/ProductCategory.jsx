import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import CategoryCard from '../Product/Category/CategoryCard';

const ProductCategory = () => {
  const navigate = useNavigate();

  const categories = [
    { title: 'Groceries', imageUrl: '/grocery.png', route: '/grocerylist' },
    { title: 'Fashion', imageUrl: '/fashion.png', route: '/fashionlist' },
    { title: 'Stationary', imageUrl: '/stationary.png', route: '/stationarylist' },
    { title: 'Books', imageUrl: '/books.png', route: '/booklist' },
  ];

  const handleCategoryClick = (route) => {
    console.log(`Navigating to: ${route}`);
    navigate(route);
  };

  return (
    <div className='prod' style={{ backgroundColor: '#F5EDED', minHeight: '100vh' }}>
      <Navbar />
      <img
        src="/banner.png"
        alt="Banner"
        style={{ width: '100%', marginBottom: '20px', marginTop: '80px' }}
      />
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Categories</h1>
      <div className='categories-container' style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {categories.map((category, index) => (
          <CategoryCard 
            key={index} 
            title={category.title} 
            imageUrl={category.imageUrl}
            onClick={() => handleCategoryClick(category.route)}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default ProductCategory;
