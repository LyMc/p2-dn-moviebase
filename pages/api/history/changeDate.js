import History from "models/History";
import dbConnect from "utils/dbConnect";

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;
  const date = JSON.parse(req.body);
  try {
    const changedMovie = await History.findOneAndUpdate(
      { id: id },
      {
        $set: {
          date: date.newDate,
        },
      }
    );
    res.status(200).json(changedMovie);
  } catch (error) {
    res.status(500).json(error);
  }
}
