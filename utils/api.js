export const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const swrOptions = {
  fetcher,
};

export const buildImageUrl = (path, size = 'original') =>
  `https://image.tmdb.org/t/p/${size}${path}`;
