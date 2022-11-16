export type MediaApi = [
  {
    show?: {
      id?: number;
      name?: string;
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
  id: number | string;
  name: string;
  genres: string[] | string;
  image: string;
  summary: string;
  rating: number | string;
};
