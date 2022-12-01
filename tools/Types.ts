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
  summary: string;
};

export type Inputs = {
  email: string;
  password: string;
};
