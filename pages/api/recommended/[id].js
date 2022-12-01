import { fetcher } from "utils/api";

const getSearchMovieUrl = (movie_id) =>
  `https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1
  `;

export default async function handler(req, res) {
  const results = await fetcher(getSearchMovieUrl(req.query.id));

  res.status(200).json(results);
}
