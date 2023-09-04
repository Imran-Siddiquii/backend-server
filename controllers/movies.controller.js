import Movie from '../models/movies.js';

const getMoviesList = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(400).json({ msg: 'no data found' });
  }
};

const getData = async (actor) => {
  const data = await Movie.find({ actors: actor });
  return data;
};

const getMovieByActorName = async (req, res) => {
  const { actorName } = req.params;

  const dataWithActorName = await getData(actorName);
  if (dataWithActorName) {
    res.json(dataWithActorName);
  } else {
    res.status(404).json({ error: 'data not found' });
  }
};

// read movie by director name
const getDataByDirector = async (directorName) => {
  const data = await Movie.find({ director: directorName });
  return data;
};

const getMoviesByDirectorName = async (req, res) => {
  const { directorName } = req.params;
  try {
    const foundData = await getDataByDirector(directorName);
    if (foundData) {
      res.json(foundData.lenght);
    } else {
      res.status(404).json({ message: 'Data not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'bad request' });
  }
};

// get movie with genre
const getMoviesByGenre = async (genre) => {
  const data = await Movie.find({ genre });
  return data;
};

const getMoviesByGenreName = async (req, res) => {
  const { genreName } = req.params;
  try {
    const foundData = await getMoviesByGenre(genreName);
    if (foundData.length) {
      res.json(foundData);
    } else {
      res.status(404).json({ message: 'Data not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' });
  }
};

// update movie
const updateMovie = async (req, res) => {
  const { movieId } = req.params;
  const data = req.body;

  const checkObj = Object.keys(data).length === 0;
  if (checkObj) {
    res.status(400).json({ error: 'please enter fields to update' });
  } else {
    const updatedMovieData = await Movie.findOneAndUpdate(
      { _id: movieId },
      data,
      {
        new: true,
      }
    );
    console.log(updatedMovieData, 'chhjhejhfj');
    if (updatedMovieData) {
      res.json({ succss: 'Data has been updated' });
    } else {
      res.status(404).json({ message: 'Data not found' });
    }
  }
};
// delete a movie
const deleteMovie = async (req, res) => {
  const { deleteId } = req.params;
  try {
    const data = await Movie.findOneAndDelete({ _id: deleteId });
    if (data) {
      res.json({ success: 'Data has been deleted' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
};

// sorted by rating in desending order
const sortedByRating = async (req, res) => {
  try {
    const sortedData = await Movie.find({}).sort({ rating: -1 });
    console.log('Movies sorted by rating (descending):', sortedData);
    res.json(sortedData);
  } catch (error) {
    res.status(400).json({ error });
  }
};

// movie sorted by accending order
const sortedByReleaseYear = async (req, res) => {
  try {
    const sortedData = await Movie.find({}).sort({ releaseYear: 1 });
    console.log('Movies sorted by release yearn (accending):', sortedData);
    res.json(sortedData);
  } catch (error) {
    res.status(400).json({ error });
  }
};

//  response movie with pages and pageSize
const movieListByPageController = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  try {
    const allData = await Movie.find();
    const totalPage = Math.ceil(allData.length / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + Number(pageSize);
    const list = allData.slice(startIndex, endIndex);
    if (page > totalPage) {
      res.json({
        totalPage,
        page,
        pageSize,
        totalMovies: allData.length,
        list: 'page not found',
      });
    } else {
      res.json({
        totalPage,
        page,
        pageSize,
        totalMovies: allData.length,
        list,
      });
    }
  } catch (error) {
    res.status.json({ error });
  }
};

// add rating and movie review

const updateMovieRating = async (movieId, rating, review, userId) => {
  try {
    const findMovie = await Movie.findOne({ _id: movieId });
    if (findMovie) {
      findMovie.ratings.push(rating);
      findMovie.reviews.push({ user: userId, text: review });
      await findMovie.save();
      const updateMovieAndReview = await Movie.findOne({
        _id: movieId,
      }).populate('reviews.user', 'username profilePictureUrl');
      return updateMovieAndReview;
    }
  } catch (error) {}
};
const addRatingAndReviewController = async (req, res) => {
  const { movieId } = req.params;
  const { rating, review, userId } = req.body;
  try {
    const updateRatingAndReview = await updateMovieRating(
      movieId,
      rating,
      review,
      userId
    );
    res.json({ updateRatingAndReview });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};

export {
  getMoviesList,
  getMovieByActorName,
  getMoviesByDirectorName,
  getMoviesByGenreName,
  updateMovie,
  deleteMovie,
  sortedByRating,
  sortedByReleaseYear,
  movieListByPageController,
  addRatingAndReviewController,
};
