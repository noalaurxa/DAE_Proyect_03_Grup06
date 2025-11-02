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
    <section>
      <h2>Personajes Populares</h2>
      <Row>
        {characters.map((char) => (
          <EntityCard key={char.id} character={char} />
        ))}
      </Row>
      <Link to="/lista">
        <Button>Ver todos los personajes</Button>
      </Link>
    </section>
  );
};

export default PopularSection;
