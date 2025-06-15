import React from 'react';
import { Anime } from '../types/anime';
import { Star, Calendar, Play, Users } from 'lucide-react';

interface AnimeCardProps {
  anime: Anime;
  onClick: () => void;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime, onClick }) => {
  const getDisplayTitle = () => {
    return anime.title_english || anime.title || 'Unknown Title';
  };

  const formatScore = (score?: number) => {
    return score ? score.toFixed(1) : 'N/A';
  };

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'currently airing':
        return 'bg-green-500';
      case 'finished airing':
        return 'bg-blue-500';
      case 'not yet aired':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div
      onClick={onClick}
      className="group relative bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800/50 cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 hover:border-purple-500/30"
    >
      <div className="relative overflow-hidden">
        <img
          src={anime.images.jpg.large_image_url || anime.images.jpg.image_url}
          alt={getDisplayTitle()}
          className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Score Badge */}
        {anime.score && (
          <div className="absolute top-3 right-3 bg-yellow-500/90 backdrop-blur-sm text-black px-3 py-1 rounded-xl flex items-center gap-1 text-sm font-bold">
            <Star className="h-3 w-3 fill-current" />
            {formatScore(anime.score)}
          </div>
        )}

        {/* Status Badge */}
        {anime.status && (
          <div className={`absolute top-3 left-3 ${getStatusColor(anime.status)}/90 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-semibold`}>
            {anime.status}
          </div>
        )}

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-purple-600/80 backdrop-blur-sm rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <Play className="h-8 w-8 text-white fill-current" />
          </div>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300 line-clamp-2">
          {getDisplayTitle()}
        </h3>
        
        {anime.title_japanese && (
          <p className="text-gray-400 text-sm mb-3 line-clamp-1">
            {anime.title_japanese}
          </p>
        )}
        
        <div className="flex items-center gap-4 text-gray-400 text-sm mb-3">
          {anime.year && (
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {anime.year}
            </div>
          )}
          {anime.episodes && (
            <div className="flex items-center gap-1">
              <Play className="h-4 w-4" />
              {anime.episodes} eps
            </div>
          )}
          {anime.members && (
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {(anime.members / 1000).toFixed(0)}k
            </div>
          )}
        </div>

        {anime.synopsis && (
          <p className="text-gray-300 text-sm line-clamp-3 leading-relaxed mb-4">
            {anime.synopsis}
          </p>
        )}

        {/* Genres */}
        {anime.genres && anime.genres.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {anime.genres.slice(0, 3).map((genre) => (
              <span
                key={genre.mal_id}
                className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded-lg border border-purple-500/30"
              >
                {genre.name}
              </span>
            ))}
            {anime.genres.length > 3 && (
              <span className="px-2 py-1 bg-gray-600/20 text-gray-400 text-xs rounded-lg">
                +{anime.genres.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Studios */}
        {anime.studios && anime.studios.length > 0 && (
          <div className="pt-3 border-t border-gray-800">
            <p className="text-xs text-gray-500">
              Studio: <span className="text-gray-300 font-medium">{anime.studios[0].name}</span>
            </p>
          </div>
        )}
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-pink-500/0 to-purple-500/0 group-hover:from-purple-500/10 group-hover:via-pink-500/5 group-hover:to-purple-500/10 transition-all duration-500 pointer-events-none" />
    </div>
  );
};

export default AnimeCard;