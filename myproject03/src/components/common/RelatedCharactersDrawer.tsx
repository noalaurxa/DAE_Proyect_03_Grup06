import { useEffect, useState } from 'react';
import { Alert, Badge, ListGroup, Offcanvas, Spinner } from 'react-bootstrap';
import { getCharactersByIds, type Character } from '../../services/entityService';

interface RelatedCharactersDrawerProps {
  title: string;
  characterUrls: string[];
  show: boolean;
  onHide: () => void;
  emptyMessage?: string;
}

const extractIds = (urls: string[]): number[] =>
  urls
    .map((url) => {
      const id = url.split('/').pop();
      return id ? Number(id) : null;
    })
    .filter((id): id is number => Boolean(id));

const RelatedCharactersDrawer = ({
  title,
  characterUrls,
  show,
  onHide,
  emptyMessage = 'No hay elementos para mostrar.',
}: RelatedCharactersDrawerProps) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      if (!show) {
        return;
      }

      const ids = extractIds(characterUrls);
      if (ids.length === 0) {
        setCharacters([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await getCharactersByIds(ids);
        setCharacters(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('No se pudieron cargar los detalles.');
        }
        setCharacters([]);
      } finally {
        setLoading(false);
      }
    };

    void fetchCharacters();
  }, [characterUrls, show]);

  return (
    <Offcanvas show={show} onHide={onHide} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{title}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {loading && (
          <div className="text-center my-4">
            <Spinner animation="border" role="status" />
            <p className="mt-2 mb-0 small text-muted">Cargando personajes...</p>
          </div>
        )}

        {error && (
          <Alert variant="danger" className="text-center">
            {error}
          </Alert>
        )}

        {!loading && !error && (
          <>
            {characters.length === 0 ? (
              <p className="text-center text-muted">{emptyMessage}</p>
            ) : (
              <ListGroup variant="flush">
                {characters.map((character) => (
                  <ListGroup.Item key={character.id} className="d-flex justify-content-between">
                    <span>{character.name}</span>
                    <Badge bg="secondary">{character.species}</Badge>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default RelatedCharactersDrawer;

