import React, { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

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

  return (
    <FavoritesContext.Provider
      value={{ favoriteMovies, handleAddToFavorites, updateLocalStorage }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export default FavoritesContext; // Add this line to export the context
