import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faHeartCrack } from '@fortawesome/free-solid-svg-icons';
import MovieModal from './MovieModal';

const FavoriteMovieCard = ({ movie, removeFavoriteMovie }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='max-w-md rounded overflow-hidden shadow-lg flex flex-col'>
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
        className='w-full'
      />
      <div className='px-6 py-4 flex-1 flex flex-col justify-between'>
        <div>
          <div className='font-bold text-xl mb-2'>{movie.title}</div>
          <p>Year: {movie.release_date.slice(0, 4)}</p>
        </div>
        <div className='mt-4 flex items-center'>
          <button
            onClick={() => removeFavoriteMovie(movie.id)}
            className='bg-transparent border-none cursor-pointer'
          >
            <FontAwesomeIcon
              icon={faHeartCrack}
              className='ease-in-out hover:text-red-500'
              color='#718096'
            />
          </button>
          <button
            onClick={openModal}
            className='bg-transparent border-none cursor-pointer ml-2'
          >
            <FontAwesomeIcon
              icon={faEye}
              className='ease-in-out hover:text-blue-500'
              color='#718096'
            />
          </button>
        </div>
      </div>
      {isModalOpen && <MovieModal movie={movie} onClose={closeModal} />}
    </div>
  );
};

export default FavoriteMovieCard;
