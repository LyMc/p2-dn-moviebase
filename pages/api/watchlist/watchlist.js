import { fetcher } from "utils/api";
import Watchlist from "models/Watchlist";
import dbConnect from "utils/dbConnect";

const getMovieUrl = (id) =>
  `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`;

export default async function handler(req, res) {
  await dbConnect();

  const watchlist = await Watchlist.find();
  if (watchlist.length > 0) {
    const movies = await Promise.all(
      watchlist.map((movie) => {
        return fetcher(getMovieUrl(movie.id));
      })
    );

    res.status(200).json(movies);
  } else {
    res.status(200).json({ data: "Your watchlist is empty" });
  }
}
