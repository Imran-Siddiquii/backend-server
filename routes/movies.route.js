import { Router } from 'express';
import {
  getMoviesList,
  getMovieByActorName,
  getMoviesByDirectorName,
  getMoviesByGenreName,
  updateMovie,
  deleteMovie,
  sortedByRating,
  sortedByReleaseYear,
} from '../controllers/movies.controller.js';
const movieRouter = Router();

movieRouter.get('/', getMoviesList);
movieRouter.get('/actor/:actorName', getMovieByActorName);
movieRouter.get('/director/:directorName', getMoviesByDirectorName);
movieRouter.get('/genre/:genreName', getMoviesByGenreName);
movieRouter.post('/:movieId', updateMovie);
movieRouter.delete('/:deleteId', deleteMovie);
movieRouter.get('/ratings', sortedByRating);
movieRouter.get('/release-years', sortedByReleaseYear);

export default movieRouter;
