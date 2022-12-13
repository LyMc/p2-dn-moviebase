import Like from "models/Like";
import dbConnect from "utils/dbConnect";

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;
  const { id } = req.query;

  if (method === "GET") {
    const like = await Like.findOne({ id });

    if (like) {
      res.status(200).json({ found: true });
    } else {
      res.status(200).json({ found: false });
    }
  } else if (method === "PUT") {
    const like = new Like({ id });
    await like.save();

    res.status(200).json({ found: true });
  } else if (method === "DELETE") {
    await Like.deleteOne({ id });
    res.status(200).json({ found: false });
  }
  res.status(400).end();
}
