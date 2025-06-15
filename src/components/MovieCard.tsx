import React from 'react';
import { Movie } from '../types/movie';
import { Star, Clock, Calendar } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group relative bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800/50 cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-500/30"
    >
      <div className="relative overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-yellow-500/90 backdrop-blur-sm text-black px-2 py-1 rounded-lg flex items-center gap-1 text-sm font-semibold">
          <Star className="h-3 w-3 fill-current" />
          {movie.rating}
        </div>

        {/* Genre Tags */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          {movie.genre.slice(0, 2).map((genre) => (
            <span
              key={genre}
              className="px-2 py-1 bg-black/70 backdrop-blur-sm text-white text-xs rounded-lg"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
          {movie.title}
        </h3>
        
        <div className="flex items-center gap-4 text-gray-400 text-sm mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {movie.year}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {movie.runtime}m
          </div>
        </div>

        <p className="text-gray-300 text-sm line-clamp-3 leading-relaxed">
          {movie.description}
        </p>

        <div className="mt-3 pt-3 border-t border-gray-800">
          <p className="text-xs text-gray-500">
            Directed by <span className="text-gray-300 font-medium">{movie.director}</span>
          </p>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/5 group-hover:to-blue-500/10 transition-all duration-500 pointer-events-none" />
    </div>
  );
};

export default MovieCard;