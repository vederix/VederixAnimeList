import React from 'react';
import { Anime } from '../types/anime';
import { X, Star, Calendar, Play, Users, Clock, ExternalLink } from 'lucide-react';

interface AnimeModalProps {
  anime: Anime | null;
  isOpen: boolean;
  onClose: () => void;
}

const AnimeModal: React.FC<AnimeModalProps> = ({ anime, isOpen, onClose }) => {
  if (!isOpen || !anime) return null;

  const getDisplayTitle = () => {
    return anime.title_english || anime.title || 'Unknown Title';
  };

  const formatScore = (score?: number) => {
    return score ? score.toFixed(1) : 'N/A';
  };

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'currently airing':
        return 'text-green-400 bg-green-400/20';
      case 'finished airing':
        return 'text-blue-400 bg-blue-400/20';
      case 'not yet aired':
        return 'text-yellow-400 bg-yellow-400/20';
      default:
        return 'text-gray-400 bg-gray-400/20';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-gray-900/95 backdrop-blur-xl rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-gray-800/50 animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Hero Section */}
        <div className="relative">
          <img
            src={anime.images.jpg.large_image_url || anime.images.jpg.image_url}
            alt={getDisplayTitle()}
            className="w-full h-80 md:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
          
          <div className="absolute bottom-8 left-8 right-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {anime.genres?.slice(0, 5).map((genre) => (
                <span
                  key={genre.mal_id}
                  className="px-3 py-1 bg-purple-600/80 backdrop-blur-sm text-white text-sm rounded-full"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
              {getDisplayTitle()}
            </h1>
            
            {anime.title_japanese && (
              <p className="text-xl text-gray-300 mb-4">
                {anime.title_japanese}
              </p>
            )}
            
            <div className="flex flex-wrap items-center gap-6 text-gray-300">
              {anime.score && (
                <div className="flex items-center gap-2">
                  <Star className="h-6 w-6 text-yellow-400 fill-current" />
                  <span className="text-2xl font-bold">{formatScore(anime.score)}</span>
                  {anime.scored_by && (
                    <span className="text-sm">({anime.scored_by.toLocaleString()} users)</span>
                  )}
                </div>
              )}
              {anime.year && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{anime.year}</span>
                </div>
              )}
              {anime.episodes && (
                <div className="flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  <span>{anime.episodes} episodes</span>
                </div>
              )}
              {anime.duration && (
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{anime.duration}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-white mb-6">Synopsis</h2>
              <p className="text-gray-300 leading-relaxed text-lg mb-8">
                {anime.synopsis || 'No synopsis available.'}
              </p>
              
              {anime.background && (
                <>
                  <h3 className="text-2xl font-bold text-white mb-4">Background</h3>
                  <p className="text-gray-300 leading-relaxed mb-8">
                    {anime.background}
                  </p>
                </>
              )}
            </div>
            
            <div className="space-y-8">
              {/* Status */}
              {anime.status && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Status</h3>
                  <span className={`px-3 py-2 rounded-lg text-sm font-medium ${getStatusColor(anime.status)}`}>
                    {anime.status}
                  </span>
                </div>
              )}

              {/* Aired */}
              {anime.aired && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Aired</h3>
                  <p className="text-gray-300">
                    {formatDate(anime.aired.from)} 
                    {anime.aired.to && ` to ${formatDate(anime.aired.to)}`}
                  </p>
                </div>
              )}

              {/* Studios */}
              {anime.studios && anime.studios.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Studios</h3>
                  <div className="space-y-2">
                    {anime.studios.map((studio) => (
                      <p key={studio.mal_id} className="text-gray-300">{studio.name}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* Producers */}
              {anime.producers && anime.producers.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Producers</h3>
                  <div className="space-y-1">
                    {anime.producers.slice(0, 5).map((producer) => (
                      <p key={producer.mal_id} className="text-gray-300 text-sm">{producer.name}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* Statistics */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Statistics</h3>
                <div className="space-y-2 text-sm">
                  {anime.rank && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Rank:</span>
                      <span className="text-white font-medium">#{anime.rank}</span>
                    </div>
                  )}
                  {anime.popularity && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Popularity:</span>
                      <span className="text-white font-medium">#{anime.popularity}</span>
                    </div>
                  )}
                  {anime.members && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Members:</span>
                      <span className="text-white font-medium">{anime.members.toLocaleString()}</span>
                    </div>
                  )}
                  {anime.favorites && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Favorites:</span>
                      <span className="text-white font-medium">{anime.favorites.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* External Link */}
              <div>
                <a
                  href={`https://myanimelist.net/anime/${anime.mal_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-colors duration-300"
                >
                  <ExternalLink className="h-5 w-5" />
                  View on MyAnimeList
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeModal;