import { NextApiRequest, NextApiResponse } from "next";
import { fetcher } from "../../../utils/api";
import { ERROR_UNEXPECTED } from "../../../utils/errors";
import { MovieDetailsData } from "../../../utils/types";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    if(request.method !== "GET") return response.status(405);
    try {
        const { id } = request.query;
        const result: MovieDetailsData = await fetcher(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`);
        response.json(result);
    } catch(e) {
        console.log(e);
        response.json({ error: true, message: ERROR_UNEXPECTED });
    }
};