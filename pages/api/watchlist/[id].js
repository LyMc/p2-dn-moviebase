import { fetcher } from "utils/api";
import Watchlist from "models/Watchlist";
import dbConnect from "utils/dbConnect";
import History from "models/History";

const getMovieUrl = (id) =>
  `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`;

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;
  const { id } = req.query;

  if (method === "GET") {
    const watchlist = await Watchlist.findOne({ id });

    if (watchlist) {
      res.status(200).json({ found: true });
    } else {
      res.status(200).json({ found: false });
    }
  } else if (method === "PUT") {
    const movie = await fetcher(getMovieUrl(id));

    const historyFavourite = await History.findOne({ id });
    if (historyFavourite) {
      await History.deleteOne({ id });
    }

    const watchlist = new Watchlist({ id, title: movie.title });
    await watchlist.save();

    res.status(200).json({ found: true });
  } else if (method === "DELETE") {
    await Watchlist.deleteOne({ id });
    res.status(200).json({ found: false });
  }
  res.status(400).end();
}
