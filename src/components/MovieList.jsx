import React, { useEffect, useState, useRef, useMemo } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import CategoryBar from './CategoryBar';

const MovieList = ({ searchQuery }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [genreNames, setGenreNames] = useState([]);
  const observer = useRef(null);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  // Filter movies based on the search query
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fetch genre names when the component mounts
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

  // Create a ref to store the last movie element for Intersection Observer
  const lastMovieRef = useRef(null);

  // Fetch more movies when the last movie element is intersected
  const loadMoreMovies = () => {
    const apiKey = '29fe95b697ecfe30786cffb743ae46c3';

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

  // Set up Intersection Observer to load more movies
  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting) {
        loadMoreMovies();
      }
    });

    // Attach the observer to the last movie element whenever movies change
    if (lastMovieRef.current) {
      observer.current.observe(lastMovieRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [movies]);

  // Handle category selection and reset movies and page
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setMovies([]);
    setPage(1);
  };

  // Handle adding and removing movies from favorites
  const handleAddToFavorites = (movie) => {
    const isAlreadyInFavorites = favoriteMovies.some(
      (favMovie) => favMovie.id === movie.id
    );

    if (isAlreadyInFavorites) {
      setFavoriteMovies((prevFavoriteMovies) =>
        prevFavoriteMovies.filter((favMovie) => favMovie.id !== movie.id)
      );
    } else {
      setFavoriteMovies((prevFavoriteMovies) => [...prevFavoriteMovies, movie]);
    }
  };

  // Implementing the useMemo functionality to prevent unnecessary rendering
  const memoizedMovieCards = useMemo(() => {
    return filteredMovies.map((movie, index) => (
      <MovieCard
        key={movie.id}
        movie={movie}
        handleAddToFavorites={handleAddToFavorites}
        isFavorite={favoriteMovies.some((favMovie) => favMovie.id === movie.id)}
      />
    ));
  }, [filteredMovies, handleAddToFavorites, favoriteMovies]);

  // Store favorite movies in local storage
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
        {memoizedMovieCards}
        <div ref={lastMovieRef} />
      </div>
    </div>
  );
};

export default MovieList;
