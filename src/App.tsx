import React, { useState, useMemo } from 'react';
import { Film, Sparkles } from 'lucide-react';
import { movies } from './data/movies';
import { Movie } from './types/movie';
import MovieCard from './components/MovieCard';
import MovieModal from './components/MovieModal';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import LoadingSkeleton from './components/LoadingSkeleton';

function App() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const genres = useMemo(() => {
    const allGenres = movies.flatMap(movie => movie.genre);
    return Array.from(new Set(allGenres)).sort();
  }, []);

  const years = useMemo(() => {
    const allYears = movies.map(movie => movie.year);
    return Array.from(new Set(allYears)).sort((a, b) => b - a);
  }, []);

  const filteredMovies = useMemo(() => {
    return movies.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          movie.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          movie.director.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = !selectedGenre || movie.genre.includes(selectedGenre);
      const matchesYear = !selectedYear || movie.year.toString() === selectedYear;
      const matchesRating = movie.rating >= minRating;

      return matchesSearch && matchesGenre && matchesYear && matchesRating;
    });
  }, [searchTerm, selectedGenre, selectedYear, minRating]);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedMovie(null), 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Film className="h-8 w-8 text-blue-500" />
                <Sparkles className="h-4 w-4 text-purple-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                CinemaHub
              </h1>
            </div>
            
            <div className="flex-1 lg:max-w-none">
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            </div>
          </div>
          
          <div className="mt-6">
            <FilterBar
              selectedGenre={selectedGenre}
              selectedYear={selectedYear}
              minRating={minRating}
              onGenreChange={setSelectedGenre}
              onYearChange={setSelectedYear}
              onRatingChange={setMinRating}
              genres={genres}
              years={years}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            Discover Amazing Movies
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore our curated collection of cinematic masterpieces from around the world
          </p>
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-semibold">
            {isLoading ? 'Loading...' : `${filteredMovies.length} Movie${filteredMovies.length !== 1 ? 's' : ''} Found`}
          </h3>
          
          {(searchTerm || selectedGenre || selectedYear || minRating > 0) && !isLoading && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedGenre('');
                setSelectedYear('');
                setMinRating(0);
              }}
              className="px-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg text-gray-300 hover:text-white hover:border-blue-500/50 transition-all duration-300"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <LoadingSkeleton key={index} />
              ))
            : filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={() => handleMovieClick(movie)}
                />
              ))}
        </div>

        {/* No Results */}
        {!isLoading && filteredMovies.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎭</div>
            <h3 className="text-2xl font-semibold mb-2">No movies found</h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search criteria or filters
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedGenre('');
                setSelectedYear('');
                setMinRating(0);
              }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors duration-300"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-800/50 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Film className="h-6 w-6 text-blue-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              CinemaHub
            </span>
          </div>
          <p className="text-gray-400">
            Discover, explore, and enjoy the world of cinema
          </p>
        </div>
      </footer>

      {/* Movie Modal */}
      <MovieModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;