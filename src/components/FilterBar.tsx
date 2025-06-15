import React from 'react';
import { Filter, Calendar, Star } from 'lucide-react';

interface FilterBarProps {
  selectedGenre: string;
  selectedYear: string;
  minRating: number;
  onGenreChange: (genre: string) => void;
  onYearChange: (year: string) => void;
  onRatingChange: (rating: number) => void;
  genres: string[];
  years: number[];
}

const FilterBar: React.FC<FilterBarProps> = ({
  selectedGenre,
  selectedYear,
  minRating,
  onGenreChange,
  onYearChange,
  onRatingChange,
  genres,
  years,
}) => {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <div className="flex items-center gap-2 text-gray-300">
        <Filter className="h-4 w-4" />
        <span className="text-sm font-medium">Filters:</span>
      </div>
      
      <div className="flex items-center gap-2">
        <select
          value={selectedGenre}
          onChange={(e) => onGenreChange(e.target.value)}
          className="px-3 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-gray-400" />
        <select
          value={selectedYear}
          onChange={(e) => onYearChange(e.target.value)}
          className="px-3 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
        >
          <option value="">All Years</option>
          {years.map((year) => (
            <option key={year} value={year.toString()}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <Star className="h-4 w-4 text-yellow-400" />
        <select
          value={minRating}
          onChange={(e) => onRatingChange(Number(e.target.value))}
          className="px-3 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
        >
          <option value={0}>Any Rating</option>
          <option value={7}>7.0+</option>
          <option value={8}>8.0+</option>
          <option value={8.5}>8.5+</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;