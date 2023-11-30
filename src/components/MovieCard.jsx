// src/components/MovieCard.js
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart as solidHeart,
  faEye,
  faCircleCheck,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import MovieModal from './MovieModal';
import { checkForMovieChanges } from '../services/movieCardService';

const MovieCard = ({ movie, handleAddToFavorites }) => {
  // State for tracking whether the movie is a favorite, show add and remove popups, and modal visibility
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showRemovePopup, setShowRemovePopup] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Effect to check if the movie is initially a favorite and if it has changes
  useEffect(() => {
    const storedFavoriteMovies =
      JSON.parse(localStorage.getItem('favoriteMovies')) || [];

    const movieInFavorites = storedFavoriteMovies.find(
      (favMovie) => favMovie.id === movie.id
    );

    setIsFavorite(!!movieInFavorites);

    // Check for changes when the movie is initially loaded
    if (movieInFavorites) {
      checkForMovieChanges(movieInFavorites.id);
    }
  }, [movie.id]);

  // Effect to automatically close add and remove popups after 3 seconds
  useEffect(() => {
    if (showAddPopup || showRemovePopup) {
      const timeoutId = setTimeout(() => {
        setShowAddPopup(false);
        setShowRemovePopup(false);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [showAddPopup, showRemovePopup]);

  // Function to check for movie changes and handle accordingly
  const handleAddToFavoritesWithPopup = (movie) => {
    if (isFavorite) {
      handleRemoveFromFavorites(movie);
    } else {
      handleAddToFavorites(movie);
    }
    setIsFavorite(!isFavorite);
    setShowAddPopup(!isFavorite);
  };

  // Function to handle removing a movie from favorites
  const handleRemoveFromFavorites = (movie) => {
    handleAddToFavorites(movie);
    setShowRemovePopup(true);
  };

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
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
      {isModalOpen && <MovieModal movie={movie} onClose={closeModal} />}
    </div>
  );
};

export default MovieCard;
