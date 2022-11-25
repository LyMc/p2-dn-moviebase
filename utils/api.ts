export const fetcher = (url: string) => fetch(url).then(res => res.json());
export const buildImageUrl = (path: string, size: string = "original") => `https://image.tmdb.org/t/p/${size}${path}`;