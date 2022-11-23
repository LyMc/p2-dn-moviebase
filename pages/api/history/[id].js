import { fetcher } from 'utils/api';
import History from 'models/History';
import dbConnect from 'utils/dbConnect';

const getMovieUrl = (id) =>
  `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`;

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;
  const { id } = req.query;

  if (method === 'GET') {
    const history = await History.findOne({ id });

    if (history) {
      res.status(200).json({ found: true });
    } else {
      res.status(404).json({ found: false });
    }
  } else if (method === 'PUT') {
    const movie = await fetcher(getMovieUrl(id));

    const history = new History({ id, title: movie.title });
    await history.save();

    res.status(200).json({ found: true });
  } else if (method === 'DELETE') {
    await History.deleteOne({ id });
    res.status(200).json({ found: false });
  }
  res.status(400).end();
}
