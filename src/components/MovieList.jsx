// src/components/MovieList.js
import React, { useEffect, useState, useRef, useMemo } from 'react';
import axios from 'axios';
import MemoizedMovieCard from './MovieCard';
import CategoryBar from './CategoryBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import {
  fetchGenreNames,
  fetchMoviesByCategory,
  fetchAllMovies,
  fetchMoviesBySearch,
} from '../services/movieListService';

const MovieList = ({ searchQuery }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [genreNames, setGenreNames] = useState([]);
  const observer = useRef(null);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Filter movies based on the search query
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fetch genre names when the component mounts
  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;

    fetchGenreNames(apiKey)
      .then((response) => {
        setGenreNames(response.data.genres);
      })
      .catch((error) => {
        console.error('Error fetching genre names:', error);
      });
  }, []);

  // Create a ref to store the last movie element for Intersection Observer
  const lastMovieRef = useRef(null);

  // Fetch movies based on the search query, category, or all movies
  const fetchMoviesData = () => {
    const apiKey = process.env.REACT_APP_API_KEY;

    if (selectedCategory) {
      fetchMoviesByCategory(apiKey, page, selectedCategory)
        .then((response) => {
          setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
          setPage(page + 1);
        })
        .catch((error) => {
          console.error('Error fetching movies:', error);
        });
    } else if (searchQuery) {
      // Fetch movies by search query
      fetchMoviesBySearch(apiKey, searchQuery)
        .then((response) => {
          setMovies(response.data.results);
        })
        .catch((error) => {
          console.error('Error fetching movies:', error);
        });
    } else {
      // Fetch all movies
      fetchAllMovies(apiKey, page)
        .then((response) => {
          setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
          setPage(page + 1);
        })
        .catch((error) => {
          console.error('Error fetching movies:', error);
        });
    }
  };

  // Set up Intersection Observer to load more movies
  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting) {
        fetchMoviesData();
      }
    });

    if (lastMovieRef.current) {
      observer.current.observe(lastMovieRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [movies, fetchMoviesData]);

  // Scroll-to-top functionality
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show/hide scroll button based on scroll position
  const handleScroll = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    setShowScrollButton(scrollTop > window.innerHeight / 2);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle category selection and reset movies and page
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setMovies([]);
    setPage(1);
  };

  // Handle adding and removing movies from favorites
  const handleAddToFavorites = (movie) => {
    const storedFavoriteMovies =
      JSON.parse(localStorage.getItem('favoriteMovies')) || [];

    const isAlreadyInFavorites = storedFavoriteMovies.some(
      (favMovie) => favMovie.id === movie.id
    );

    if (isAlreadyInFavorites) {
      const updatedFavoriteMovies = storedFavoriteMovies.filter(
        (favMovie) => favMovie.id !== movie.id
      );
      setFavoriteMovies(updatedFavoriteMovies);
      updateLocalStorage(updatedFavoriteMovies);
    } else {
      const updatedFavoriteMovies = [...storedFavoriteMovies, movie];
      setFavoriteMovies(updatedFavoriteMovies);
      updateLocalStorage(updatedFavoriteMovies);
    }
  };

  const updateLocalStorage = (updatedFavoriteMovies) => {
    localStorage.setItem(
      'favoriteMovies',
      JSON.stringify(updatedFavoriteMovies)
    );
  };

  // Implementing the useMemo functionality to prevent unnecessary rendering
  const memoizedMovieCards = useMemo(() => {
    return filteredMovies.map((movie, index) => {
      const isFavorite = favoriteMovies.some(
        (favMovie) => favMovie.id === movie.id
      );
      return (
        <MemoizedMovieCard
          key={movie.id}
          movie={movie}
          handleAddToFavorites={handleAddToFavorites}
          isFavorite={isFavorite}
        />
      );
    });
  }, [filteredMovies, handleAddToFavorites, favoriteMovies]);

  // Dynamic title based on the selected category
  const getTitle = () => {
    if (selectedCategory) {
      const selectedGenre = genreNames.find(
        (genre) => genre.id === selectedCategory
      );
      return selectedGenre
        ? `Explore ${selectedGenre.name} Movies`
        : 'Explore Movies';
    } else {
      return 'Explore Movies';
    }
  };

  return (
    <div>
      <CategoryBar
        categories={genreNames}
        onCategorySelect={handleCategorySelect}
      />
      <h2 className='text-2xl font-bold mb-4 flex justify-center'>
        {getTitle()}
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
        {memoizedMovieCards}
        <div ref={lastMovieRef} />
      </div>
      {showScrollButton && (
        <button
          className='fixed bottom-4 right-4 bg-blue-500 p-3 rounded-full text-white'
          onClick={scrollToTop}
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      )}
    </div>
  );
};

export default MovieList;
