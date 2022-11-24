import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(request: NextApiRequest, response: NextApiResponse) {
    if(request.method !== "GET") return response.status(405);
    const { query } = request.query;
    response.send(query);
};