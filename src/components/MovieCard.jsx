import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

const MovieCard = ({ movie, handleAddToFavorites, isFavorite }) => {
  return (
    <div
      id={`movie-${movie.id}`}
      className={`max-w-md rounded overflow-hidden shadow-lg flex flex-col bg-white`}
    >
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
        <div className='mt-4'>
          <button
            onClick={() => handleAddToFavorites(movie)}
            className='bg-transparent border-none cursor-pointer'
          >
            {isFavorite ? (
              <FontAwesomeIcon icon={solidHeart} />
            ) : (
              <FontAwesomeIcon icon={regularHeart} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
