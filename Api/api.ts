export type MediaApi = [
  {
    show: {
      id: number;
      name: string;
      genres?: string[];
      rating?: {
        average?: number;
      };
      image?: {
        original?: string;
      };
      summary?: string;
    };
  },
];

export type Media = {
  id: number;
  name: string;
  genres: string[] | string;
  image: string;
  summary: string;
  rating: number | string;
};

export const searchByName = async (search: string): Promise<Media[]> => {
  let payload: Media[];

  const res = await fetch(`https://api.tvmaze.com/search/shows?q=${search}`);
  const data: MediaApi = await res.json();
  payload = data.map((item) => {
    return {
      id: item.show.id,
      name: item.show.name,
      genres: item.show.genres || '',
      image: item.show.image?.original || '',
      summary: item.show.summary || '',
      rating: item.show.rating?.average || '',
    };
  });

  return payload;
};
