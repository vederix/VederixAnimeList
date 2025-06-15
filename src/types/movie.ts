export interface Movie {
  id: number;
  title: string;
  poster: string;
  backdrop: string;
  year: number;
  genre: string[];
  rating: number;
  runtime: number;
  description: string;
  director: string;
  cast: string[];
  trailer?: string;
}