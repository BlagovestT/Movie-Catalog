import React from 'react';
import Navbar from '../components/Navbar';
import FavoriteList from '../components/FavoriteList'; // Import the FavoriteList component

const Favorites = () => {
  return (
    <div>
      <Navbar />
      <div className='container mx-auto'>
        <FavoriteList />
      </div>
    </div>
  );
};

export default Favorites;
