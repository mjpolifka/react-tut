import http from './httpService';
import config from '../config.json';

const { apiUrl } = config; // react gave me an error if I tried importing this directly
const apiEndpoint = `${apiUrl}/movies`;

export function getMovies() {
  return http.get(apiEndpoint);
}

export function deleteMovie(movieId) {
  return http.delete(apiEndpoint + "/" + movieId);
}