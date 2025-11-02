// src/services/api.js
import axios from 'axios';

// Creamos una instancia de Axios con la configuración base
const api = axios.create({
  baseURL: 'https://rickandmortyapi.com/api'
});

// (Opcional) Aquí puedes agregar interceptores si los necesitas
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Manejo global de errores
    console.error('Error en la petición API:', error);
    return Promise.reject(error);
  }
);

export default api;