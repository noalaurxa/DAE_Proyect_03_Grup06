import { useState, useEffect } from 'react';
import { Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Nuestros componentes
import { getPopularCharacters } from '../../services/entityService';
import EntityCard from '../list/EntityCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorAlert from '../common/ErrorAlert';

const PopularSection = () => {
  // 1. Estados
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Efecto para cargar datos
  useEffect(() => {
    const fetchPopular = async () => {
      try {
        setLoading(true);
        const data = await getPopularCharacters();
        setCharacters(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPopular();
  }, []); // El array vacío [] significa que se ejecuta 1 vez al montar

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert message={error} />;
  }

  // 4. Renderizado exitoso
  return (
    <div className="mt-5">
      <h2 className="text-center mb-4">Personajes Populares</h2>
      <Row>
        {characters.map((char) => (
          <EntityCard key={char.id} character={char} />
        ))}
      </Row>
      <div className="text-center mt-3">
        <Button as={Link} to="/lista" variant="outline-primary" size="lg">
          Ver todos los personajes
        </Button>
      </div>
    </div>
  );
};

export default PopularSection;