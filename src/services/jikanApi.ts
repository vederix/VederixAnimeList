const BASE_URL = 'https://api.jikan.moe/v4';

// Rate limiting helper
let lastRequestTime = 0;
const RATE_LIMIT_DELAY = 1000; // 1 second between requests

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const makeRequest = async (url: string) => {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  
  if (timeSinceLastRequest < RATE_LIMIT_DELAY) {
    await delay(RATE_LIMIT_DELAY - timeSinceLastRequest);
  }
  
  lastRequestTime = Date.now();
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

export const jikanApi = {
  // Get top/popular anime
  getTopAnime: async (page: number = 1, limit: number = 25) => {
    const url = `${BASE_URL}/top/anime?page=${page}&limit=${limit}`;
    return makeRequest(url);
  },

  // Search anime by query
  searchAnime: async (query: string, page: number = 1, limit: number = 25) => {
    const encodedQuery = encodeURIComponent(query);
    const url = `${BASE_URL}/anime?q=${encodedQuery}&page=${page}&limit=${limit}&order_by=popularity&sort=asc`;
    return makeRequest(url);
  },

  // Get anime by ID
  getAnimeById: async (id: number) => {
    const url = `${BASE_URL}/anime/${id}`;
    return makeRequest(url);
  },

  // Get seasonal anime
  getSeasonalAnime: async (year?: number, season?: string) => {
    const currentYear = year || new Date().getFullYear();
    const currentSeason = season || getCurrentSeason();
    const url = `${BASE_URL}/seasons/${currentYear}/${currentSeason}`;
    return makeRequest(url);
  },

  // Get anime recommendations
  getAnimeRecommendations: async (id: number) => {
    const url = `${BASE_URL}/anime/${id}/recommendations`;
    return makeRequest(url);
  }
};

const getCurrentSeason = (): string => {
  const month = new Date().getMonth() + 1;
  if (month >= 1 && month <= 3) return 'winter';
  if (month >= 4 && month <= 6) return 'spring';
  if (month >= 7 && month <= 9) return 'summer';
  return 'fall';
};