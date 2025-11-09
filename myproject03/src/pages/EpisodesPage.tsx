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
  Pagination,
} from 'react-bootstrap';
import ErrorAlert from '../components/common/ErrorAlert';
import LoadingSpinner from '../components/common/LoadingSpinner';
import RelatedCharactersDrawer from '../components/common/RelatedCharactersDrawer';
import useEpisodes from '../hooks/useEpisodes';

type SortOption = 'recent' | 'oldest' | 'az';

const getSeasonCode = (episodeCode: string) => episodeCode.split('E')[0] ?? '';

const formatSeasonLabel = (episodeCode: string) => {
  const season = getSeasonCode(episodeCode).replace('S', '');
  return `Temporada ${Number(season)}`;
};

const EpisodesPage = () => {
  const { episodes, loading, error } = useEpisodes();
  const [searchTerm, setSearchTerm] = useState('');
  const [seasonFilter, setSeasonFilter] = useState('all');
  const [sortOption, setSortOption] = useState<SortOption>('recent');
  const [drawerData, setDrawerData] = useState<{ title: string; urls: string[] } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const episodesPerPage = 9;

  const seasonOptions = useMemo(() => {
    const seasons = new Set<string>();
    episodes.forEach((episode) => seasons.add(getSeasonCode(episode.episode)));
    return Array.from(seasons).sort();
  }, [episodes]);

  const filteredEpisodes = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const filtered = episodes.filter((episode) => {
      const matchesSearch =
        episode.name.toLowerCase().includes(normalizedSearch) ||
        episode.episode.toLowerCase().includes(normalizedSearch);

      const matchesSeason =
        seasonFilter === 'all' || getSeasonCode(episode.episode) === seasonFilter;

      return matchesSearch && matchesSeason;
    });

    return filtered.sort((a, b) => {
      if (sortOption === 'az') {
        return a.name.localeCompare(b.name);
      }

      const dateA = new Date(a.air_date).getTime();
      const dateB = new Date(b.air_date).getTime();

      return sortOption === 'recent' ? dateB - dateA : dateA - dateB;
    });
  }, [episodes, searchTerm, seasonFilter, sortOption]);

  const stats = useMemo(() => {
    const totalCharacters = episodes.reduce((acc, episode) => acc + episode.characters.length, 0);
    return {
      totalEpisodes: episodes.length,
      totalSeasons: seasonOptions.length,
      avgCharacters: episodes.length ? Math.round(totalCharacters / episodes.length) : 0,
    };
  }, [episodes, seasonOptions]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSeasonFilter('all');
    setSortOption('recent');
    setCurrentPage(1);
  };

  // --- Paginación ---
  const indexOfLast = currentPage * episodesPerPage;
  const indexOfFirst = indexOfLast - episodesPerPage;
  const currentEpisodes = filteredEpisodes.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredEpisodes.length / episodesPerPage);

  return (
    <Container fluid className="py-5 bg-light min-vh-100">
      <Container className="p-4 bg-white rounded-4 shadow-sm">
        <header className="mb-5 text-center">
          <h1 className="fw-bold text-primary mb-3">Episodios</h1>
          <p className="text-muted mb-0 fs-5">
            Explora todos los episodios, filtra por temporada, ordena por fecha y descubre los
            personajes que aparecen en cada uno.
          </p>
        </header>

        {/* Estadísticas */}
        <Row className="g-3 mb-4 text-center">
          <Col md={4}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Body>
                <p className="text-muted text-uppercase small mb-1">Episodios</p>
                <h2 className="mb-0 fw-bold">{stats.totalEpisodes}</h2>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Body>
                <p className="text-muted text-uppercase small mb-1">Temporadas</p>
                <h2 className="mb-0 fw-bold">{stats.totalSeasons}</h2>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Body>
                <p className="text-muted text-uppercase small mb-1">Promedio de personajes</p>
                <h2 className="mb-0 fw-bold">{stats.avgCharacters}</h2>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Filtros */}
        <Card className="shadow-sm border-0 mb-4">
          <Card.Body>
            <Row className="gy-3 align-items-end">
              <Col md={4}>
                <Form.Label className="text-muted fw-semibold">Buscar episodio</Form.Label>
                <Form.Control
                  placeholder="Nombre o código (S01E01)"
                  value={searchTerm}
                  onChange={(event) => {
                    setSearchTerm(event.target.value);
                    setCurrentPage(1);
                  }}
                />
              </Col>
              <Col md={4}>
                <Form.Label className="text-muted fw-semibold">Temporada</Form.Label>
                <Form.Select
                  value={seasonFilter}
                  onChange={(event) => {
                    setSeasonFilter(event.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="all">Todas</option>
                  {seasonOptions.map((season) => (
                    <option key={season} value={season}>
                      {formatSeasonLabel(season)}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col md={4}>
                <Form.Label className="text-muted fw-semibold d-block">Ordenar por</Form.Label>
                <ButtonGroup className="w-100">
                  <Button
                    variant={sortOption === 'recent' ? 'primary' : 'outline-primary'}
                    onClick={() => setSortOption('recent')}
                  >
                    Más recientes
                  </Button>
                  <Button
                    variant={sortOption === 'oldest' ? 'primary' : 'outline-primary'}
                    onClick={() => setSortOption('oldest')}
                  >
                    Más antiguos
                  </Button>
                  <Button
                    variant={sortOption === 'az' ? 'primary' : 'outline-primary'}
                    onClick={() => setSortOption('az')}
                  >
                    A-Z
                  </Button>
                </ButtonGroup>
              </Col>
            </Row>
            <div className="text-end mt-3">
              <Button variant="link" className="text-decoration-none" onClick={handleResetFilters}>
                Limpiar filtros
              </Button>
            </div>
          </Card.Body>
        </Card>

        {loading && <LoadingSpinner />}
        {error && <ErrorAlert message={error} />}

        {!loading && !error && (
          <>
            {currentEpisodes.length === 0 ? (
              <p className="text-center fs-5 text-muted">
                No se encontraron episodios con los criterios elegidos.
              </p>
            ) : (
              <>
                <Row className="g-4">
                  {currentEpisodes.map((episode) => (
                    <Col key={episode.id} xs={12} md={6} xl={4}>
                      <Card className="h-100 shadow-sm border-0">
                        <Card.Body>
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <div>
                              <Card.Title className="mb-1">{episode.name}</Card.Title>
                              <Card.Subtitle className="text-muted">{episode.episode}</Card.Subtitle>
                            </div>
                            <Badge bg="info" text="dark">
                              {formatSeasonLabel(episode.episode)}
                            </Badge>
                          </div>
                          <p className="text-muted mb-2">
                            Emitido el <strong>{episode.air_date}</strong>
                          </p>
                          <div className="d-flex justify-content-between align-items-center">
                            <small className="text-muted">
                              {episode.characters.length} personajes
                            </small>
                            <Button
                              size="sm"
                              variant="outline-primary"
                              onClick={() =>
                                setDrawerData({
                                  title: `Personajes en ${episode.name}`,
                                  urls: episode.characters,
                                })
                              }
                            >
                              Ver personajes
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>

                {/* --- PAGINACIÓN --- */}
                {totalPages > 1 && (
                  <Pagination className="justify-content-center mt-5">
                    {[...Array(totalPages)].map((_, index) => (
                      <Pagination.Item
                        key={index + 1}
                        active={index + 1 === currentPage}
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
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
          emptyMessage="No hay personajes asociados a este episodio."
        />
      </Container>
    </Container>
  );
};

export default EpisodesPage;
