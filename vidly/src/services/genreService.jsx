import http from './httpService';
import config from "../config.json";

const { apiUrl } = config; // react gave me an error if I tried importing this directly
export function getGenres() {
  return http.get(`${apiUrl}/genres`);
}
