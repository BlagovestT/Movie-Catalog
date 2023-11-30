// src/services/movieListService.js
import axios from 'axios';

export const fetchGenreNames = (apiKey) => {
  return axios.get(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
  );
};

export const fetchMoviesByCategory = (apiKey, page, selectedCategory) => {
  return axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}&with_genres=${selectedCategory}`
  );
};

export const fetchMoviesBySearch = (apiKey, searchQuery) => {
  return axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`
  );
};

export const fetchAllMovies = (apiKey, page) => {
  return axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`
  );
};
