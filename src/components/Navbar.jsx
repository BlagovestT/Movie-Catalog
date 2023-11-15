import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ setSearchQuery }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    setSearchQuery(query);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <nav className='bg-blue-500 p-4 flex flex-col md:flex-row items-center justify-between'>
      <div className='text-white font-bold text-xl md:text-2xl mb-2 md:mb-0'>
        Movie Catalog
      </div>

      <div className='flex justify-center items-center mb-2 md:mb-0'>
        <input
          type='text'
          placeholder='Search...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className='px-2 py-1 rounded-l-full border-r-0 focus:outline-none'
        />
        <button
          onClick={handleSearch}
          className='px-4 py-2 bg-blue-700 text-white rounded-r-full hover:bg-blue-600'
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>

      <div className='flex items-center space-x-4'>
        <a href='/' className='text-white hover:underline'>
          Movies
        </a>
        <a href='/favorites' className='text-white hover:underline'>
          Favorites
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
