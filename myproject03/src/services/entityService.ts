import type { AxiosError, AxiosResponse } from 'axios';
import api from './api';
//Candidad de personajes que se va a mostrar en la seccion de populares
const POPULAR_IDS = [1, 2, 3, 4, 5, 6, 7, 8];

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  [key: string]: unknown;
}

export interface PaginationInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface CharacterResponse {
  info: PaginationInfo;
  results: Character[];
}

export const getPopularCharacters = async (): Promise<Character[]> => {
  try {
    const response: AxiosResponse<Character[]> = await api.get<Character[]>(
      `/character/${POPULAR_IDS.join(',')}`
    );
    return response.data;
  } catch (error) {
    console.error('Error al obtener personajes populares:', error);
    throw error;
  }
};

export const getAllCharacters = async (
  params: Record<string, string | number | undefined>
): Promise<CharacterResponse> => {
  try {
    const response: AxiosResponse<CharacterResponse> = await api.get<CharacterResponse>(
      '/character',
      { params }
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('Error al obtener todos los personajes:', error);
    if (axiosError.response?.status === 404) {
      return { info: { count: 0, pages: 0, next: null, prev: null }, results: [] };
    }
    throw error;
  }
};
