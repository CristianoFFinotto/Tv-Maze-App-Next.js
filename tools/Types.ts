export type MediaApi = [
  {
    show: {
      id: string;
      name: string;
      genres?: string[];
      rating?: {
        average?: string;
      };
      image?: {
        original?: string;
      };
      summary?: string;
    };
  },
];

export type Media = {
  id: string;
  name: string;
  image: string;
};

export type MediaDetailApi = {
  id: string;
  name: string;
  genres: string[];
  rating?: {
    average?: string;
  };
  image?: {
    original?: string;
  };
  summary?: string;
};

export type MediaDetail = {
  id: string;
  name: string;
  genres: string[];
  rating: string;
  image: string;
  summary: string;
};

export type Inputs = {
  email: string;
  password: string;
};
