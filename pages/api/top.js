import { fetcher } from "utils/api";

const getSearchMovieUrl = () => `
https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`;

export default async function handler(req, res) {
  const results = await fetcher(getSearchMovieUrl());

  res.status(200).json(results);
}
