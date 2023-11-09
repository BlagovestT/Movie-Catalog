import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import MovieList from '../components/MovieList';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      <Navbar setSearchQuery={setSearchQuery} />
      <div className='container mx-auto'>
        <MovieList searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default Home;
