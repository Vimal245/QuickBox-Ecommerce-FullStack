import React from 'react';
import './CategoryCard.css';

const CategoryCard = ({ title, imageUrl, onClick }) => {
  return (
    <div className='category-card' onClick={onClick} style={{ cursor: 'pointer' }}>
      <img src={imageUrl} alt={title} style={{ width: '160px', height: '160px' }} />
      <h2>{title}</h2>
    </div>
  );
};

export default CategoryCard;