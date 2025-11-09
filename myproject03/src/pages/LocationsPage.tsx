import { useMemo, useState } from 'react';
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Form,
  Row,
  Table,
} from 'react-bootstrap';
import ErrorAlert from '../components/common/ErrorAlert';
import LoadingSpinner from '../components/common/LoadingSpinner';
import RelatedCharactersDrawer from '../components/common/RelatedCharactersDrawer';
import useLocations from '../hooks/useLocations';

type ViewMode = 'cards' | 'table';

const LocationsPage = () => {
  const { locations, loading, error } = useLocations();
  const [searchTerm, setSearchTerm] = useState('');
  const [dimensionFilter, setDimensionFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [viewMode, setViewMode] = useState<ViewMode>('cards');
  const [drawerData, setDrawerData] = useState<{ title: string; urls: string[] } | null>(null);

  const dimensionOptions = useMemo(() => {
    const dimensions = new Set<string>();
    locations.forEach((location) => {
      if (location.dimension) {
        dimensions.add(location.dimension);
      }
    });
    return Array.from(dimensions).sort();
  }, [locations]);

  const typeOptions = useMemo(() => {
    const types = new Set<string>();
    locations.forEach((location) => {
      if (location.type) {
        types.add(location.type);
      }
    });
    return Array.from(types).sort();
  }, [locations]);

  const filteredLocations = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return locations.filter((location) => {
      const matchesSearch =
        location.name.toLowerCase().includes(normalizedSearch) ||
        location.type.toLowerCase().includes(normalizedSearch) ||
        location.dimension.toLowerCase().includes(normalizedSearch);

      const matchesDimension =
        dimensionFilter === 'all' || location.dimension === dimensionFilter;

      const matchesType = typeFilter === 'all' || location.type === typeFilter;

      return matchesSearch && matchesDimension && matchesType;
    });
  }, [locations, searchTerm, dimensionFilter, typeFilter]);

  const stats = useMemo(() => {
    const totalResidents = locations.reduce((sum, location) => sum + location.residents.length, 0);
    return {
      totalLocations: locations.length,
      uniqueDimensions: dimensionOptions.length,
      totalResidents,
    };
  }, [locations, dimensionOptions]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setDimensionFilter('all');
    setTypeFilter('all');
  };

  const renderCards = () => (
    <Row className="g-4">
      {filteredLocations.map((location) => (
        <Col key={location.id} xs={12} md={6} xl={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <Card.Title className="mb-1">{location.name}</Card.Title>
                  <Card.Subtitle className="text-muted">{location.type || 'Sin tipo'}</Card.Subtitle>
                </div>
                <Badge bg="secondary" title="Dimensión">
                  {location.dimension || 'Desconocida'}
                </Badge>
              </div>
              <p className="text-muted mb-3">
                {location.residents.length}{' '}
                {location.residents.length === 1 ? 'habitante' : 'habitantes'}
              </p>
              <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted">Creado el {location.created.split('T')[0]}</small>
                <Button
                  size="sm"
                  variant="outline-primary"
                  onClick={() =>
                    setDrawerData({
                      title: `Habitantes de ${location.name}`,
                      urls: location.residents,
                    })
                  }
                >
                  Ver habitantes
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );

  const renderTable = () => (
    <div className="table-responsive">
      <Table hover className="align-middle">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Dimensión</th>
            <th>Habitantes</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredLocations.map((location) => (
            <tr key={location.id}>
              <td>{location.name}</td>
              <td>
                <Badge bg="light" text="dark">
                  {location.type || 'Sin tipo'}
                </Badge>
              </td>
              <td>{location.dimension || 'Desconocida'}</td>
              <td>{location.residents.length}</td>
              <td className="text-end">
                <Button
                  size="sm"
                  variant="outline-primary"
                  onClick={() =>
                    setDrawerData({
                      title: `Habitantes de ${location.name}`,
                      urls: location.residents,
                    })
                  }
                >
                  Explorar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );

  return (
    <Container fluid className="my-5 p-4">
      <header className="mb-5 text-center text-md-start">
        <h1 className="mb-2">Ubicaciones</h1>
        <p className="text-muted mb-0">
          Navega por las ubicaciones más emblemáticas, filtra por dimensión o tipo y descubre cuántos
          habitantes viven en cada una.
        </p>
      </header>

      <Row className="g-3 mb-4">
        <Col md={4}>
          <Card className="h-100 shadow-sm text-center">
            <Card.Body>
              <p className="text-muted text-uppercase small mb-1">Ubicaciones totales</p>
              <h2 className="mb-0">{stats.totalLocations}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 shadow-sm text-center">
            <Card.Body>
              <p className="text-muted text-uppercase small mb-1">Dimensiones únicas</p>
              <h2 className="mb-0">{stats.uniqueDimensions}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 shadow-sm text-center">
            <Card.Body>
              <p className="text-muted text-uppercase small mb-1">Habitantes censados</p>
              <h2 className="mb-0">{stats.totalResidents}</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Row className="gy-3">
            <Col md={4}>
              <Form.Label className="text-muted fw-semibold">Buscar</Form.Label>
              <Form.Control
                placeholder="Nombre, tipo o dimensión"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </Col>
            <Col md={4}>
              <Form.Label className="text-muted fw-semibold">Filtrar por dimensión</Form.Label>
              <Form.Select
                value={dimensionFilter}
                onChange={(event) => setDimensionFilter(event.target.value)}
              >
                <option value="all">Todas</option>
                {dimensionOptions.map((dimension) => (
                  <option key={dimension} value={dimension}>
                    {dimension}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col md={4}>
              <Form.Label className="text-muted fw-semibold">Filtrar por tipo</Form.Label>
              <Form.Select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
                <option value="all">Todos</option>
                {typeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
          <Row className="mt-3 gy-3 align-items-center">
            <Col md={6}>
              <Button variant="link" className="text-decoration-none p-0" onClick={handleResetFilters}>
                Limpiar filtros
              </Button>
            </Col>
            <Col md={6} className="text-md-end">
              <ButtonGroup>
                <Button
                  variant={viewMode === 'cards' ? 'primary' : 'outline-primary'}
                  onClick={() => setViewMode('cards')}
                >
                  Vista tarjetas
                </Button>
                <Button
                  variant={viewMode === 'table' ? 'primary' : 'outline-primary'}
                  onClick={() => setViewMode('table')}
                >
                  Vista tabla
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {loading && <LoadingSpinner />}
      {error && <ErrorAlert message={error} />}

      {!loading && !error && (
        <>
          {filteredLocations.length === 0 ? (
            <p className="text-center fs-5">No se encontraron ubicaciones con los filtros aplicados.</p>
          ) : viewMode === 'cards' ? (
            renderCards()
          ) : (
            renderTable()
          )}
        </>
      )}

      <RelatedCharactersDrawer
        title={drawerData?.title ?? ''}
        characterUrls={drawerData?.urls ?? []}
        show={Boolean(drawerData)}
        onHide={() => setDrawerData(null)}
        emptyMessage="No hay habitantes registrados en esta ubicación."
      />
    </Container>
  );
};

export default LocationsPage;
