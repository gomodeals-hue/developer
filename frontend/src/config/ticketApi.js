// Base API URL for Tickets (using relative proxy /api in development and production)
export const API = import.meta.env.VITE_API_URL || '';
export default API;
