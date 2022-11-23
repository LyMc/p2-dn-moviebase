import { fetcher } from 'utils/api';

const getSearchMovieUrl = (terms) =>
  `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${terms}`;

export default async function handler(req, res) {
  const results = await fetcher(getSearchMovieUrl(req.query.terms));

  res.status(200).json(results);
}
