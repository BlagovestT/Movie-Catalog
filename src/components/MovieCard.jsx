import React, { memo, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faCircleCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

const MovieCard = ({ movie, handleAddToFavorites }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showRemovePopup, setShowRemovePopup] = useState(false);

  useEffect(() => {
    // Check if the movie is in the favorites list stored in local storage
    const storedFavoriteMovies =
      JSON.parse(localStorage.getItem('favoriteMovies')) || [];

    const movieIsFavorite = storedFavoriteMovies.some(
      (favMovie) => favMovie.id === movie.id
    );

    // Set the isFavorite state accordingly
    setIsFavorite(movieIsFavorite);
  }, [movie.id]);

  useEffect(() => {
    if (showAddPopup || showRemovePopup) {
      const timeoutId = setTimeout(() => {
        setShowAddPopup(false);
        setShowRemovePopup(false);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [showAddPopup, showRemovePopup]);

  const handleAddToFavoritesWithPopup = (movie) => {
    if (isFavorite) {
      handleRemoveFromFavorites(movie);
    } else {
      handleAddToFavorites(movie);
    }
    setIsFavorite(!isFavorite);
    setShowAddPopup(!isFavorite);
  };

  const handleRemoveFromFavorites = (movie) => {
    handleAddToFavorites(movie);
    setShowRemovePopup(true);
  };

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
            onClick={() => handleAddToFavoritesWithPopup(movie)}
            className='bg-transparent border-none cursor-pointer'
          >
            <FontAwesomeIcon
              icon={isFavorite ? solidHeart : regularHeart}
              color={isFavorite ? '#e53e3e' : '#718096'}
            />
          </button>
        </div>
      </div>
      {showAddPopup && (
        <div className='fixed bottom-4 left-4 p-4 bg-green-500 text-white rounded flex items-center'>
          <FontAwesomeIcon icon={faCircleCheck} className='mr-2' />
          <div>{`${movie.title} was added to favorites`}</div>
        </div>
      )}
      {showRemovePopup && (
        <div className='fixed bottom-4 left-4 p-4 bg-red-500 text-white rounded flex items-center'>
          <FontAwesomeIcon icon={faTimes} className='mr-2' />
          <div>{`${movie.title} was removed from favorites`}</div>
        </div>
      )}
    </div>
  );
};

const MemoizedMovieCard = memo(MovieCard);
export default MovieCard;
