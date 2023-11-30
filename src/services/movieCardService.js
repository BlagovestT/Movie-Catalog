import axios from 'axios';

export const checkForMovieChanges = async (movieId) => {
  try {
    const apiKey = process.env.REACT_APP_API_KEY;
    const endDate = new Date().toISOString(); // Current date and time
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/changes?api_key=${apiKey}&end_date=${endDate}`
    );

    if (response.data && response.data.changes.length > 0) {
      // Movie has changes since it was added, handle accordingly
      console.log(
        `Movie with ID ${movieId} has changed since it was added to favorites!`
      );
    }
  } catch (error) {
    console.error('Error checking for movie changes:', error);
  }
};
