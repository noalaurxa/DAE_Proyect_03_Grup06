import { useEffect, useState } from 'react';
import { Button, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getPopularCharacters, type Character } from '../../services/entityService';
import EntityCard from '../list/EntityCard';

const PopularSection = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPopularCharacters = async () => {
      try {
        const data = await getPopularCharacters();
        setCharacters(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('No se pudo cargar la lista de personajes populares.');
        }
      }
    };

    void fetchPopularCharacters();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="text-center py-8 bg-white">
      <h2 className="fw-bold mb-4">Personajes de Rick and Morty</h2>
      <Row className="justify-content-center g-4 mb-4">
        {characters.map((char) => (
          <EntityCard key={char.id} character={char} />
        ))}
      </Row>
      <Link to="/lista">
        <Button variant="primary" size="lg">
          Ver todos los personajes
        </Button>
      </Link>
    </section>
  );
};


export default PopularSection;
