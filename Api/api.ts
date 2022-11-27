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

export type Media = {
  id: number;
  name: string;
  image: string;
};

export type MediaDetailApi = {
  id: number;
  name: string;
  genres: string[];
  rating?: {
    average?: number;
  };
  image?: {
    original?: string;
  };
  summary?: string;
};

export type MediaDetail = {
  id: number;
  name: string;
  genres: string[];
  rating: number | string;
  image: string;
  // eslint-disable-next-line no-undef
  summary: string | JSX.Element | JSX.Element[];
};

export const searchByName = async (search: string): Promise<Media[]> => {
  const res = await fetch(`https://api.tvmaze.com/search/shows?q=${search}`);
  if (res.ok) {
    const data: MediaApi = await res.json();
    return data.map((item) => ({
      id: item.show.id,
      name: item.show.name,
      image: item.show.image?.original || '/no-image-found.jpg',
    }));
  } else {
    throw new Error('Not 2xx response');
  }
};

export const searchById = async (id: string): Promise<MediaDetail> => {
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);

  if (res.ok) {
    const data: MediaDetailApi = await res.json();

    return {
      id: data.id,
      name: data.name,
      genres: data.genres.length > 0 ? data.genres : ['no genres available'],
      image: data.image?.original || '/no-image-found.jpg',
      summary: data.summary ? parse(data.summary) : 'no summary available',
      rating: data.rating?.average || 'no rating available',
    };
  } else {
    throw new Error('Not 2xx response');
  }
};
