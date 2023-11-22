import React, { useEffect, useState, useMemo } from 'react';
import FavoriteMovieCard from './FavoriteMovieCard';

const FavoriteList = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    // Load favorite movies from local storage when the component mounts
    const storedFavoriteMovies =
      JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    setFavoriteMovies(storedFavoriteMovies);
  }, []);

  const removeFavoriteMovie = (movieId) => {
    // Remove a favorite movie by its ID
    const updatedFavoriteMovies = favoriteMovies.filter(
      (movie) => movie.id !== movieId
    );
    setFavoriteMovies(updatedFavoriteMovies);

    // Update local storage
    localStorage.setItem(
      'favoriteMovies',
      JSON.stringify(updatedFavoriteMovies)
    );
  };

  const memoizedFavoriteMovieCards = useMemo(() => {
    return favoriteMovies.map((movie) => (
      <FavoriteMovieCard
        key={movie.id}
        movie={movie}
        removeFavoriteMovie={removeFavoriteMovie}
      />
    ));
  }, [favoriteMovies, removeFavoriteMovie]);

  return (
    <div>
      <h2 className='mt-5 text-2xl font-bold mb-4 flex justify-center '>
        My Favorite Movies
      </h2>
      {favoriteMovies.length === 0 ? (
        <p className='text-center'>You don't have any favorite movies yet.</p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
          {memoizedFavoriteMovieCards}
        </div>
      )}
    </div>
  );
};

export default FavoriteList;
