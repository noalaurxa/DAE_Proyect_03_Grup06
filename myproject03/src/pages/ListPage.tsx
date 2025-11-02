import { Container, Row } from 'react-bootstrap';
import ErrorAlert from '../components/common/ErrorAlert';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EntityCard from '../components/list/EntityCard';
import FilterBar from '../components/list/FilterBar';
import Pagination from '../components/list/Pagination';
import useEntities from '../hooks/useEntities';

const ListPage = () => {
  const {
    characters,
    paginationInfo,
    loading,
    error,
    searchParams,
    handlePageChange,
    handleFilterChange,
    handleClearFilters,
  } = useEntities();

  return (
    <Container fluid className="my-5 p-4">
      <h1 className="mb-4">Listado de personajes</h1>

      <FilterBar onFilter={handleFilterChange} onClear={handleClearFilters} initialFilters={searchParams} />

      {loading && <LoadingSpinner />}

      {error && <ErrorAlert message={error} />}

      {!loading && !error && (
        <>
          {characters.length === 0 ? (
            <p className="text-center fs-5">No se encontraron personajes con esos filtros.</p>
          ) : (
            <>
              <Row>
                {characters.map((character) => (
                  <EntityCard key={character.id} character={character} />
                ))}
              </Row>

              <Pagination paginationInfo={paginationInfo} onPageChange={handlePageChange} />
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default ListPage;
