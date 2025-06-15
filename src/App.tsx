import React, { useState, useEffect } from 'react';
import { Play, Sparkles, TrendingUp } from 'lucide-react';
import { Anime, JikanResponse } from './types/anime';
import { jikanApi } from './services/jikanApi';
import { useLanguage } from './hooks/useLanguage';
import AnimeCard from './components/AnimeCard';
import AnimeModal from './components/AnimeModal';
import SearchBar from './components/SearchBar';
import LoadingSkeleton from './components/LoadingSkeleton';
import ErrorMessage from './components/ErrorMessage';
import LanguageToggle from './components/LanguageToggle';

function App() {
  const { language, toggleLanguage, t } = useLanguage();
  const [popularAnime, setPopularAnime] = useState<Anime[]>([]);
  const [searchResults, setSearchResults] = useState<Anime[]>([]);
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  // Load popular anime on component mount
  useEffect(() => {
    loadPopularAnime();
  }, []);

  const loadPopularAnime = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response: JikanResponse = await jikanApi.getTopAnime(1, 24);
      setPopularAnime(response.data);
    } catch (err) {
      setError(t.loadError);
      console.error('Error loading popular anime:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchQuery('');
      setSearchResults([]);
      setCurrentPage(1);
      return;
    }

    try {
      setIsSearching(true);
      setError(null);
      setSearchQuery(query);
      setCurrentPage(1);
      
      const response: JikanResponse = await jikanApi.searchAnime(query, 1, 24);
      setSearchResults(response.data);
      setHasNextPage(response.pagination.has_next_page);
    } catch (err) {
      setError(t.searchError);
      console.error('Error searching anime:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const loadMoreResults = async () => {
    if (!searchQuery || !hasNextPage || isSearching) return;

    try {
      setIsSearching(true);
      const nextPage = currentPage + 1;
      const response: JikanResponse = await jikanApi.searchAnime(searchQuery, nextPage, 24);
      
      setSearchResults(prev => [...prev, ...response.data]);
      setCurrentPage(nextPage);
      setHasNextPage(response.pagination.has_next_page);
    } catch (err) {
      console.error('Error loading more results:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleAnimeClick = (anime: Anime) => {
    setSelectedAnime(anime);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedAnime(null), 300);
  };

  const displayedAnime = searchQuery ? searchResults : popularAnime;
  const isShowingSearchResults = searchQuery && searchResults.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Play className="h-8 w-8 text-purple-500" />
                  <Sparkles className="h-4 w-4 text-pink-400 absolute -top-1 -right-1 animate-pulse" />
                </div>
                <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  {t.appName}
                </h1>
              </div>
              
              <div className="lg:hidden">
                <LanguageToggle 
                  language={language} 
                  onToggle={toggleLanguage} 
                  t={t}
                />
              </div>
            </div>
            
            <div className="flex-1 lg:max-w-none">
              <SearchBar
                onSearch={handleSearch}
                isLoading={isSearching}
                placeholder={t.searchPlaceholder}
              />
            </div>
            
            <div className="hidden lg:block">
              <LanguageToggle 
                language={language} 
                onToggle={toggleLanguage} 
                t={t}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        {!searchQuery && (
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              {t.heroTitle}
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {t.heroSubtitle}
            </p>
          </div>
        )}

        {/* Section Title */}
        <div className="flex items-center gap-3 mb-8">
          {isShowingSearchResults ? (
            <>
              <h3 className="text-2xl font-semibold">
                {t.searchResults} "{searchQuery}"
              </h3>
              <span className="text-gray-400">({searchResults.length} {t.found})</span>
            </>
          ) : (
            <>
              <TrendingUp className="h-6 w-6 text-purple-400" />
              <h3 className="text-2xl font-semibold">{t.popularAnime}</h3>
            </>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <ErrorMessage 
            message={error} 
            onRetry={searchQuery ? () => handleSearch(searchQuery) : loadPopularAnime}
            t={t}
          />
        )}

        {/* Anime Grid */}
        {!error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {(isLoading || isSearching) && displayedAnime.length === 0
              ? Array.from({ length: 12 }).map((_, index) => (
                  <LoadingSkeleton key={index} />
                ))
              : displayedAnime.map((anime) => (
                  <AnimeCard
                    key={anime.mal_id}
                    anime={anime}
                    onClick={() => handleAnimeClick(anime)}
                    t={t}
                  />
                ))}
          </div>
        )}

        {/* Load More Button */}
        {isShowingSearchResults && hasNextPage && !isSearching && (
          <div className="text-center mt-12">
            <button
              onClick={loadMoreResults}
              className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-colors duration-300 transform hover:scale-105"
            >
              {t.loadMore}
            </button>
          </div>
        )}

        {/* Loading More Indicator */}
        {isSearching && searchResults.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <LoadingSkeleton key={`loading-${index}`} />
            ))}
          </div>
        )}

        {/* No Results */}
        {searchQuery && !isSearching && searchResults.length === 0 && !error && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold mb-2">{t.noResults}</h3>
            <p className="text-gray-400 mb-6">
              {t.noResultsDesc}
            </p>
            <button
              onClick={() => handleSearch('')}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-semibold transition-colors duration-300"
            >
              {t.clearSearch}
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-800/50 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Play className="h-6 w-6 text-purple-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              {t.appName}
            </span>
          </div>
          <p className="text-gray-400 mb-2">
            {t.footerDesc}
          </p>
          <p className="text-gray-500 text-sm">
            {t.footerPowered}
          </p>
        </div>
      </footer>

      {/* Anime Modal */}
      <AnimeModal
        anime={selectedAnime}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        t={t}
      />
    </div>
  );
}

export default App;