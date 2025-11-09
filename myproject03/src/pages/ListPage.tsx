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
    <Container fluid className="py-5 bg-light min-vh-100">
      <Container className="p-4 rounded-4 bg-white shadow-sm">
        <h1 className="text-center fw-bold mb-4 text-primary">
          Listado de Personajes
        </h1>

        {/* Barra de filtros */}
        <div className="mb-4">
          <FilterBar
            onFilter={handleFilterChange}
            onClear={handleClearFilters}
            initialFilters={searchParams}
          />
        </div>

        {/* Carga y errores */}
        {loading && <LoadingSpinner />}
        {error && <ErrorAlert message={error} />}

        {/* Contenido principal */}
        {!loading && !error && (
          <>
            {characters.length === 0 ? (
              <p className="text-center fs-5 text-muted my-5">
                No se encontraron personajes con esos filtros.
              </p>
            ) : (
              <>
                <Row className="g-4 justify-content-center">
                  {characters.map((character) => (
                    <EntityCard key={character.id} character={character} />
                  ))}
                </Row>

                {/* Paginación centrada */}
                <div className="d-flex justify-content-center mt-5">
                  <Pagination
                    paginationInfo={paginationInfo}
                    onPageChange={handlePageChange}
                  />
                </div>
              </>
            )}
          </>
        )}
      </Container>
    </Container>
  );
};

export default ListPage;
