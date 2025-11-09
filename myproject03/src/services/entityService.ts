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

export interface Episode {
  id: number;
  name: string;
  episode: string;
  air_date: string;
  characters: string[];
  url: string;
  created: string;
}

export interface EpisodeResponse {
  info: PaginationInfo;
  results: Episode[];
}

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export interface LocationResponse {
  info: PaginationInfo;
  results: Location[];
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

export const getAllEpisodes = async (url?: string): Promise<EpisodeResponse> => {
  try {
    const endpoint = url ?? '/episode';
    const response: AxiosResponse<EpisodeResponse> = await api.get<EpisodeResponse>(endpoint);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('Error al obtener episodios:', error);
    if (axiosError.response?.status === 404) {
      return { info: { count: 0, pages: 0, next: null, prev: null }, results: [] };
    }
    throw error;
  }
};

export const getAllLocations = async (url?: string): Promise<LocationResponse> => {
  try {
    const endpoint = url ?? '/location';
    const response: AxiosResponse<LocationResponse> = await api.get<LocationResponse>(endpoint);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('Error al obtener ubicaciones:', error);
    if (axiosError.response?.status === 404) {
      return { info: { count: 0, pages: 0, next: null, prev: null }, results: [] };
    }
    throw error;
  }
};

export const getCharacterById = async (id: number): Promise<Character> => {
  try {
    const response: AxiosResponse<Character> = await api.get<Character>(`/character/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el personaje con id ${id}:`, error);
    throw error;
  }
};

export const getCharactersByIds = async (ids: number[]): Promise<Character[]> => {
  if (ids.length === 0) {
    return [];
  }

  try {
    const response: AxiosResponse<Character | Character[]> = await api.get<Character | Character[]>(
      `/character/${ids.join(',')}`
    );
    return Array.isArray(response.data) ? response.data : [response.data];
  } catch (error) {
    console.error('Error al obtener personajes por ids:', error);
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
