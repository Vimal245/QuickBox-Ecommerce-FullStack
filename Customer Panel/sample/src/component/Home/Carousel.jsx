import React, { useState, useEffect } from 'react';

const TopCarousel = () => {
  const [image, setImage] = useState('img1.png');

  const arr = [
    'img1.png',
    'img2.png',
    'img3.png',
    'img4.png',
  ];

  let i = 1;

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (i === arr.length) {
        i = 0;
      }
      setImage(arr[i]);
      i++;
    }, 3000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <br /><br /><br />
      <img src={`${process.env.PUBLIC_URL}/${image}`} alt="Carousel" style={{ width: '100%', height: 'auto' }} />
    </>
  );
};

export default TopCarousel;
