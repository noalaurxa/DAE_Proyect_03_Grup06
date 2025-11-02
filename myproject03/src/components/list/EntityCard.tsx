import type { Character } from '../../services/entityService';
import { Card, Col } from 'react-bootstrap';

interface EntityCardProps {
  character: Character;
}

const EntityCard = ({ character }: EntityCardProps) => {
  return (
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
