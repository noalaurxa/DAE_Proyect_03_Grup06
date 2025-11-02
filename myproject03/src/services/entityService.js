// src/services/entityService.js
import api from './api';

// --- Esta es la función que ya teníamos ---
const POPULAR_IDS = [1, 2, 3, 4, 5, 19];

export const getPopularCharacters = async () => {
  try {
    const response = await api.get(`/character/${POPULAR_IDS.join(',')}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener personajes populares:', error);
    throw error;
  }
};

// --- AÑADE ESTA NUEVA FUNCIÓN ---
/**
 * Obtiene personajes con paginación y filtros.
 * @param {object} params - Objeto con parámetros de query (page, name, status, etc.)
 * Ejemplo: { page: 2, name: 'rick', status: 'alive' }
 */
export const getAllCharacters = async (params) => {
  try {
    // Axios se encarga de construir la URL: /character?page=2&name=rick&status=alive
    const response = await api.get('/character', { params: params });
    return response.data;
  } catch (error) {
    console.error('Error al obtener todos los personajes:', error);
    // Si la API da un 404 (ej. "Rick no existe"), no es un error de app,
    // sino un "no hay resultados". La API de Rick&Morty maneja esto con un error,
    // así que lo capturamos y devolvemos un array vacío.
    if (error.response && error.response.status === 404) {
      return { info: { count: 0, pages: 0, next: null, prev: null }, results: [] };
    }
    throw error;
  }
};