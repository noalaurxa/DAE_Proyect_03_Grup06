import axios from 'axios';
import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

// Cliente Axios configurado con la URL base de la API de Rick and Morty
const api: AxiosInstance = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // Manejo global de errores HTTP
    console.error('Error en la peticion API:', error);
    return Promise.reject(error);
  }
);

export default api;
