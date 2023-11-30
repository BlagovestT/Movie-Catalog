import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const MovieModal = ({ movie, onClose }) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center overflow-y-auto p-4'>
      <div className='relative p-8 bg-slate-50 max-w-md rounded-lg shadow-lg'>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className='w-full h-64 object-cover mb-6 rounded-md'
        />
        <h2 className='text-2xl font-bold mb-4'>{movie.title}</h2>
        <p className='text-gray-700 mb-4'>{movie.overview}</p>
        <div className='flex items-center'>
          <FontAwesomeIcon icon={faStar} className='text-yellow-500 mr-2' />
          <span className='text-gray-700'>{movie.vote_average}</span>
        </div>
        <button
          onClick={onClose}
          className='mt-6 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800'
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default MovieModal;
