export type Language = 'id' | 'en';

export interface Translations {
  // Header
  appName: string;
  searchPlaceholder: string;
  
  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  
  // Section Titles
  popularAnime: string;
  searchResults: string;
  found: string;
  
  // Anime Card
  episodes: string;
  eps: string;
  studio: string;
  
  // Anime Modal
  synopsis: string;
  background: string;
  status: string;
  aired: string;
  studios: string;
  producers: string;
  statistics: string;
  rank: string;
  popularity: string;
  members: string;
  favorites: string;
  viewOnMAL: string;
  
  // Status
  currentlyAiring: string;
  finishedAiring: string;
  notYetAired: string;
  
  // Actions
  loadMore: string;
  tryAgain: string;
  clearSearch: string;
  
  // Error Messages
  errorTitle: string;
  loadError: string;
  searchError: string;
  
  // No Results
  noResults: string;
  noResultsDesc: string;
  
  // Footer
  footerDesc: string;
  footerPowered: string;
  
  // Language
  language: string;
  indonesian: string;
  english: string;
}

export const translations: Record<Language, Translations> = {
  id: {
    // Header
    appName: 'VederixAnimeList',
    searchPlaceholder: 'Cari anime...',
    
    // Hero Section
    heroTitle: 'Temukan Anime Menakjubkan',
    heroSubtitle: 'Jelajahi serial anime paling populer di dunia dan temukan acara favorit Anda selanjutnya',
    
    // Section Titles
    popularAnime: 'Anime Populer',
    searchResults: 'Hasil Pencarian untuk',
    found: 'ditemukan',
    
    // Anime Card
    episodes: 'episode',
    eps: 'eps',
    studio: 'Studio',
    
    // Anime Modal
    synopsis: 'Sinopsis',
    background: 'Latar Belakang',
    status: 'Status',
    aired: 'Ditayangkan',
    studios: 'Studio',
    producers: 'Produser',
    statistics: 'Statistik',
    rank: 'Peringkat',
    popularity: 'Popularitas',
    members: 'Anggota',
    favorites: 'Favorit',
    viewOnMAL: 'Lihat di MyAnimeList',
    
    // Status
    currentlyAiring: 'Sedang Tayang',
    finishedAiring: 'Selesai Tayang',
    notYetAired: 'Belum Tayang',
    
    // Actions
    loadMore: 'Muat Lebih Banyak Anime',
    tryAgain: 'Coba Lagi',
    clearSearch: 'Hapus Pencarian',
    
    // Error Messages
    errorTitle: 'Ups! Terjadi kesalahan',
    loadError: 'Gagal memuat anime populer. Silakan coba lagi nanti.',
    searchError: 'Gagal mencari anime. Silakan coba lagi.',
    
    // No Results
    noResults: 'Anime tidak ditemukan',
    noResultsDesc: 'Coba cari dengan kata kunci yang berbeda atau periksa ejaan Anda',
    
    // Footer
    footerDesc: 'Temukan dan jelajahi dunia anime',
    footerPowered: 'Didukung oleh Jikan API - API MyAnimeList Tidak Resmi',
    
    // Language
    language: 'Bahasa',
    indonesian: 'Indonesia',
    english: 'English'
  },
  en: {
    // Header
    appName: 'VederixAnimeList',
    searchPlaceholder: 'Search for anime...',
    
    // Hero Section
    heroTitle: 'Discover Amazing Anime',
    heroSubtitle: 'Explore the world\'s most popular anime series and discover your next favorite show',
    
    // Section Titles
    popularAnime: 'Popular Anime',
    searchResults: 'Search Results for',
    found: 'found',
    
    // Anime Card
    episodes: 'episodes',
    eps: 'eps',
    studio: 'Studio',
    
    // Anime Modal
    synopsis: 'Synopsis',
    background: 'Background',
    status: 'Status',
    aired: 'Aired',
    studios: 'Studios',
    producers: 'Producers',
    statistics: 'Statistics',
    rank: 'Rank',
    popularity: 'Popularity',
    members: 'Members',
    favorites: 'Favorites',
    viewOnMAL: 'View on MyAnimeList',
    
    // Status
    currentlyAiring: 'Currently Airing',
    finishedAiring: 'Finished Airing',
    notYetAired: 'Not Yet Aired',
    
    // Actions
    loadMore: 'Load More Anime',
    tryAgain: 'Try Again',
    clearSearch: 'Clear Search',
    
    // Error Messages
    errorTitle: 'Oops! Something went wrong',
    loadError: 'Failed to load popular anime. Please try again later.',
    searchError: 'Failed to search anime. Please try again.',
    
    // No Results
    noResults: 'No anime found',
    noResultsDesc: 'Try searching with different keywords or check your spelling',
    
    // Footer
    footerDesc: 'Discover and explore the world of anime',
    footerPowered: 'Powered by Jikan API - The Unofficial MyAnimeList API',
    
    // Language
    language: 'Language',
    indonesian: 'Indonesia',
    english: 'English'
  }
};