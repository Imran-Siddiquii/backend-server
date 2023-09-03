const express = require('express');
const {
  getMoviesList,
  getMovieByActorName,
  getMoviesByDirectorName,
  getMoviesByGenreName,
  updateMovie,
  deleteMovie,
  sortedByRating,
  sortedByReleaseYear,
} = require('../controllers/movies.controller');
const movieRouter = express.Router();

movieRouter.get('/', getMoviesList);
movieRouter.get('/actor/:actorName', getMovieByActorName);
movieRouter.get('/director/:directorName',getMoviesByDirectorName);
movieRouter.get('/genre/:genreName', getMoviesByGenreName);
movieRouter.post('/:movieId',updateMovie);
movieRouter.delete('/:deleteId',deleteMovie)
movieRouter.get('/ratings',sortedByRating);
movieRouter.get('/release-years',sortedByReleaseYear)


module.exports = movieRouter;
