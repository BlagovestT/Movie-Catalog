import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import CategoryBar from './CategoryBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

const MovieList = ({ searchQuery }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [genreNames, setGenreNames] = useState([]);
  const observer = useRef(null);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [isPopupVisible, setPopupVisible] = useState(false);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const closePopup = () => {
    setPopupVisible(false);
  };

  useEffect(() => {
    const apiKey = '29fe95b697ecfe30786cffb743ae46c3';
    axios
      .get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`)
      .then((response) => {
        setGenreNames(response.data.genres);
      })
      .catch((error) => {
        console.error('Error fetching genre names:', error);
      });
  }, []);

  useEffect(() => {
    const apiKey = '29fe95b697ecfe30786cffb743ae46c3';

    const loadMoreMovies = () => {
      axios
        .get(
          selectedCategory
            ? `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}&with_genres=${selectedCategory}`
            : `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`
        )
        .then((response) => {
          setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
          setPage(page + 1);
        })
        .catch((error) => {
          console.error('Error fetching movies:', error);
        });
    };

    // Create an Intersection Observer to trigger loading more movies when scrolling to the bottom
    observer.current = new IntersectionObserver((entries) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting) {
        loadMoreMovies();
      }
    });

    // Observe the last movie element in the list to trigger loading more movies
    if (movies.length > 0) {
      observer.current.observe(document.querySelector('.movie:last-child'));
    }

    if (page === 1) {
      loadMoreMovies();
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [page, selectedCategory, movies]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setMovies([]); // Clear the current movies when changing categories
    setPage(1); // Reset the page when changing categories
  };

  const handleAddToFavorites = (movie) => {
    const isAlreadyInFavorites = favoriteMovies.some(
      (favMovie) => favMovie.id === movie.id
    );

    if (!isAlreadyInFavorites) {
      setFavoriteMovies((prevFavoriteMovies) => [...prevFavoriteMovies, movie]);
      setPopupVisible(true);
    }
  };

  useEffect(() => {
    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
  }, [favoriteMovies]);

  return (
    <div>
      <CategoryBar
        categories={genreNames}
        onCategorySelect={handleCategorySelect}
      />
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
        {filteredMovies.map((movie, index) => (
          <div
            key={movie.id}
            className={`max-w-md rounded overflow-hidden shadow-lg flex flex-col bg-white ${
              index === filteredMovies.length - 1 ? 'movie' : ''
            }`}
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
                {/* Conditionally render the heart icon based on whether the movie is in favorites */}
                <button
                  onClick={() => handleAddToFavorites(movie)}
                  className='bg-transparent border-none cursor-pointer'
                >
                  {favoriteMovies.some(
                    (favMovie) => favMovie.id === movie.id
                  ) ? (
                    <FontAwesomeIcon icon={solidHeart} />
                  ) : (
                    <FontAwesomeIcon icon={regularHeart} />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
