// src/hooks/useEntities.js
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAllCharacters } from '../services/entityService';

function useEntities() {
  // 1. Estados
  const [characters, setCharacters] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Hook de React Router para leer y escribir en la URL (Query Params)
  // Ej: /lista?page=2&name=rick
  const [searchParams, setSearchParams] = useSearchParams();

  // 3. Efecto que se ejecuta cada vez que la URL (searchParams) cambia
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        setError(null);

        // Convierte los searchParams de la URL a un objeto
        // que nuestra función de servicio pueda entender
        const params = Object.fromEntries(searchParams.entries());

        const data = await getAllCharacters(params);
        
        setCharacters(data.results);
        setPaginationInfo(data.info);
      } catch (err) {
        setError(err.message);
        setCharacters([]);
        setPaginationInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [searchParams]); // <-- Dependencia: se re-ejecuta si searchParams cambia

  // 4. Funciones que los componentes (Filtro, Paginación) llamarán
  
  // Función para cambiar la página
  const handlePageChange = (newPage) => {
    // Actualiza los searchParams de la URL
    // Esto disparará el useEffect de arriba automáticamente
    setSearchParams(prev => {
      prev.set('page', newPage);
      return prev;
    });
  };

  // Función para aplicar filtros
  const handleFilterChange = (filters) => {
    // Resetea a la página 1 cuando aplicas un filtro nuevo
    filters.page = 1; 
    setSearchParams(filters);
  };
  
  // Función para limpiar filtros
  const handleClearFilters = () => {
    setSearchParams({}); // URL queda limpia
  };

  // 5. Retornamos todo lo que la página necesita
  return {
    characters,
    paginationInfo,
    loading,
    error,
    searchParams, // Para que los filtros sepan qué valor mostrar
    handlePageChange,
    handleFilterChange,
    handleClearFilters
  };
}

export default useEntities;