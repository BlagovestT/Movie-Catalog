import React, { useEffect, useState } from 'react';

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

  return (
    <div>
      <h2 className='mt-5 text-2xl font-bold mb-4 flex justify-center '>
        My Favorite Movies
      </h2>
      {favoriteMovies.length === 0 ? (
        <p className='text-center'>You don't have any favorite movies yet.</p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
          {favoriteMovies.map((movie) => (
            <div
              key={movie.id}
              className='max-w-md rounded overflow-hidden shadow-lg flex flex-col'
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
                    onClick={() => removeFavoriteMovie(movie.id)}
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteList;
