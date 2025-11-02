import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  getAllCharacters,
  type Character,
  type PaginationInfo,
} from '../services/entityService';

interface UseEntitiesResult {
  characters: Character[];
  paginationInfo: PaginationInfo | null;
  loading: boolean;
  error: string | null;
  searchParams: URLSearchParams;
  handlePageChange: (newPage: number) => void;
  handleFilterChange: (filters: Record<string, string>) => void;
  handleClearFilters: () => void;
}

const useEntities = (): UseEntitiesResult => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = Object.fromEntries(searchParams.entries());
        const data = await getAllCharacters(params);

        setCharacters(data.results);
        setPaginationInfo(data.info);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Error al cargar personajes.');
        }
        setCharacters([]);
        setPaginationInfo(null);
      } finally {
        setLoading(false);
      }
    };

    void fetchCharacters();
  }, [searchParams]);

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('page', newPage.toString());
      return next;
    });
  };

  const handleFilterChange = (filters: Record<string, string>) => {
    setSearchParams({
      ...filters,
      page: '1',
    });
  };

  const handleClearFilters = () => {
    setSearchParams({});
  };

  return {
    characters,
    paginationInfo,
    loading,
    error,
    searchParams,
    handlePageChange,
    handleFilterChange,
    handleClearFilters,
  };
};

export default useEntities;
