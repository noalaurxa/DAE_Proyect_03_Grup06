import { Card, Col } from 'react-bootstrap';

// 'character' será el objeto que recibamos de la API
const EntityCard = ({ character }) => {
  return (
    // Usamos 'Col' para que se integre bien en el 'Row'
    <Col md={4} lg={3} className="mb-4">
      <Card className="h-100 shadow-sm text-center">
        <Card.Img variant="top" src={character.image} />
        <Card.Body>
          <Card.Title>{character.name}</Card.Title>
          <Card.Text>
            <strong>Especie:</strong> {character.species} <br />
            <strong>Estado:</strong> {character.status}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default EntityCard;