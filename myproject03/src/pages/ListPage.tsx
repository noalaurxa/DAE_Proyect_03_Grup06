// src/pages/ListPage.jsx
import React from 'react';
import { Container, Row } from 'react-bootstrap';

// 1. Importar todos los componentes y el hook
import useEntities from '../hooks/useEntities';
import FilterBar from '../components/list/FilterBar';
import Pagination from '../components/list/Pagination';
import EntityCard from '../components/list/EntityCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorAlert from '../components/common/ErrorAlert';

const ListPage = () => {
  // 2. Usar nuestro hook. ¡Él hace todo el trabajo!
  const {
    characters,
    paginationInfo,
    loading,
    error,
    searchParams,
    handlePageChange,
    handleFilterChange,
    handleClearFilters
  } = useEntities();

  // 3. Renderizado
  return (
    <Container fluid className="my-5 p-4">
      <h1 className="mb-4">Listado de Personajes</h1>

      {/* 4. Pasar las props al FilterBar */}
      <FilterBar
        onFilter={handleFilterChange}
        onClear={handleClearFilters}
        initialFilters={searchParams}
      />

      {/* 5. Renderizado condicional (Loading, Error, Datos) */}
      {loading && <LoadingSpinner />}
      
      {error && <ErrorAlert message={error} />}

      {!loading && !error && (
        <>
          {/* 6. Si no hay resultados */}
          {characters.length === 0 ? (
            <p className="text-center fs-5">No se encontraron personajes con esos filtros.</p>
          ) : (
            <>
              {/* 7. El Grid de personajes */}
              <Row>
                {characters.map((char) => (
                  <EntityCard key={char.id} character={char} />
                ))}
              </Row>

              {/* 8. La Paginación */}
              <Pagination
                paginationInfo={paginationInfo}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default ListPage;