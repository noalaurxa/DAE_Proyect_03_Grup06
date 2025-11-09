import { useState, useMemo } from 'react';
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Form,
  Row,
  Pagination,
} from 'react-bootstrap';
import ErrorAlert from '../components/common/ErrorAlert';
import LoadingSpinner from '../components/common/LoadingSpinner';
import RelatedCharactersDrawer from '../components/common/RelatedCharactersDrawer';
import useLocations from '../hooks/useLocations';

const LocationsPage = () => {
  const { locations, loading, error } = useLocations();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortOption, setSortOption] = useState('az');
  const [drawerData, setDrawerData] = useState<{ title: string; urls: string[] } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const locationsPerPage = 9;

  // --- Filtros ---
  const typeOptions = useMemo(() => {
    const types = new Set<string>();
    locations.forEach((loc) => {
      if (loc.type) types.add(loc.type);
    });
    return Array.from(types).sort();
  }, [locations]);

  const filteredLocations = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const filtered = locations.filter((loc) => {
      const matchesSearch =
        loc.name.toLowerCase().includes(normalizedSearch) ||
        loc.dimension.toLowerCase().includes(normalizedSearch);

      const matchesType = typeFilter === 'all' || loc.type === typeFilter;

      return matchesSearch && matchesType;
    });

    return filtered.sort((a, b) => {
      if (sortOption === 'az') return a.name.localeCompare(b.name);
      if (sortOption === 'za') return b.name.localeCompare(a.name);
      return 0;
    });
  }, [locations, searchTerm, typeFilter, sortOption]);

  // --- Estadísticas ---
  const stats = useMemo(() => {
    const totalResidents = locations.reduce((acc, loc) => acc + loc.residents.length, 0);
    return {
      totalLocations: locations.length,
      totalTypes: typeOptions.length,
      avgResidents: locations.length ? Math.round(totalResidents / locations.length) : 0,
    };
  }, [locations, typeOptions]);

  // --- Paginación ---
  const indexOfLast = currentPage * locationsPerPage;
  const indexOfFirst = indexOfLast - locationsPerPage;
  const currentLocations = filteredLocations.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredLocations.length / locationsPerPage);

  const handleResetFilters = () => {
    setSearchTerm('');
    setTypeFilter('all');
    setSortOption('az');
    setCurrentPage(1);
  };

  return (
    <Container fluid className="py-5 bg-light min-vh-100">
      <Container className="p-4 bg-white rounded-4 shadow-sm">
        <header className="mb-5 text-center">
          <h1 className="fw-bold text-primary mb-3">Ubicaciones</h1>
          <p className="text-muted fs-5">
            Explora todos los lugares del universo de Rick and Morty. Filtra por tipo o dimensión y
            descubre quién vive allí.
          </p>
        </header>

        {/* --- Estadísticas --- */}
        <Row className="g-3 mb-4 text-center">
          <Col md={4}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Body>
                <p className="text-muted text-uppercase small mb-1">Ubicaciones</p>
                <h2 className="fw-bold mb-0">{stats.totalLocations}</h2>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Body>
                <p className="text-muted text-uppercase small mb-1">Tipos</p>
                <h2 className="fw-bold mb-0">{stats.totalTypes}</h2>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Body>
                <p className="text-muted text-uppercase small mb-1">Promedio de residentes</p>
                <h2 className="fw-bold mb-0">{stats.avgResidents}</h2>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* --- Filtros --- */}
        <Card className="shadow-sm border-0 mb-4">
          <Card.Body>
            <Row className="gy-3 align-items-end">
              <Col md={4}>
                <Form.Label className="text-muted fw-semibold">Buscar ubicación</Form.Label>
                <Form.Control
                  placeholder="Nombre o dimensión"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </Col>
              <Col md={4}>
                <Form.Label className="text-muted fw-semibold">Tipo</Form.Label>
                <Form.Select
                  value={typeFilter}
                  onChange={(e) => {
                    setTypeFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="all">Todos</option>
                  {typeOptions.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col md={4}>
                <Form.Label className="text-muted fw-semibold d-block">Ordenar</Form.Label>
                <ButtonGroup className="w-100">
                  <Button
                    variant={sortOption === 'az' ? 'primary' : 'outline-primary'}
                    onClick={() => setSortOption('az')}
                  >
                    A-Z
                  </Button>
                  <Button
                    variant={sortOption === 'za' ? 'primary' : 'outline-primary'}
                    onClick={() => setSortOption('za')}
                  >
                    Z-A
                  </Button>
                </ButtonGroup>
              </Col>
            </Row>
            <div className="text-end mt-3">
              <Button variant="link" onClick={handleResetFilters}>
                Limpiar filtros
              </Button>
            </div>
          </Card.Body>
        </Card>

        {loading && <LoadingSpinner />}
        {error && <ErrorAlert message={error} />}

        {!loading && !error && (
          <>
            {currentLocations.length === 0 ? (
              <p className="text-center fs-5 text-muted">
                No se encontraron ubicaciones con esos filtros.
              </p>
            ) : (
              <>
                <Row className="g-4">
                  {currentLocations.map((loc) => (
                    <Col key={loc.id} xs={12} md={6} xl={4}>
                      <Card className="h-100 shadow-sm border-0">
                        <Card.Body>
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <div>
                              <Card.Title className="mb-1">{loc.name}</Card.Title>
                              <Card.Subtitle className="text-muted">{loc.type}</Card.Subtitle>
                            </div>
                            <Badge bg="info" text="dark">
                              {loc.dimension || 'Desconocida'}
                            </Badge>
                          </div>
                          <p className="text-muted mb-2">
                            {loc.residents.length} residentes registrados
                          </p>
                          <div className="text-end">
                            <Button
                              size="sm"
                              variant="outline-primary"
                              onClick={() =>
                                setDrawerData({
                                  title: `Residentes en ${loc.name}`,
                                  urls: loc.residents,
                                })
                              }
                            >
                              Ver residentes
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>

                {/* --- Paginación --- */}
                {totalPages > 1 && (
                  <Pagination className="justify-content-center mt-5">
                    {[...Array(totalPages)].map((_, i) => (
                      <Pagination.Item
                        key={i + 1}
                        active={i + 1 === currentPage}
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </Pagination.Item>
                    ))}
                  </Pagination>
                )}
              </>
            )}
          </>
        )}

        <RelatedCharactersDrawer
          title={drawerData?.title ?? ''}
          characterUrls={drawerData?.urls ?? []}
          show={Boolean(drawerData)}
          onHide={() => setDrawerData(null)}
          emptyMessage="No hay residentes en esta ubicación."
        />
      </Container>
    </Container>
  );
};

export default LocationsPage;
