import parse from 'html-react-parser';

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

type MediaDetail = {
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
  if (res.ok) {
    const data: MediaApi = await res.json();
    payload = data.map((item) => {
      return {
        id: item.show.id,
        name: item.show.name,
        genres: item.show.genres || 'no genres available',
        image: item.show.image?.original || '/no-image-found.jpg',
        summary: item.show.summary || 'no summary available',
        rating: item.show.rating?.average || 'no rating available',
      };
    });
    return payload;
  } else {
    throw new Error('Not 2xx response');
  }
};

export const searchById = async (id: string): Promise<Media> => {
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);

  if (res.ok) {
    const data: MediaDetail = await res.json();
    const payload = {
      id: data.id,
      name: data.name,
      genres: data.genres || 'no genres available',
      image: data.image?.original || '/no-image-found.jpg',
      summary: data.summary ? parse(data.summary) : 'no summary available',
      rating: data.rating?.average || 'no rating available',
    };

    return payload as Media;
  } else {
    throw new Error('Not 2xx response');
  }
};
