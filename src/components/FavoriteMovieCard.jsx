import React from 'react';

const FavoriteMovieCard = ({ movie, removeFavoriteMovie }) => {
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
  );
};

export default FavoriteMovieCard;
