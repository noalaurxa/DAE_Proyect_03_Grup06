import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <Container fluid className="bg-light p-5 rounded-3 mb-5 shadow-sm">
      <Row className="align-items-center">
        <Col md={8}>
          <h1 className="display-4 fw-bold">Bienvenido al Universo React</h1>
          <p className="fs-4">
            Explora una increíble colección de entidades de tu API favorita.
            Navega, filtra y descubre todo lo que este universo tiene para ofrecer.
          </p>
          <Button as={Link} to="/lista" variant="primary" size="lg">
            ¡Comenzar a Explorar!
          </Button>
        </Col>
        <Col md={4} className="text-center d-none d-md-block">
          {/* Puedes poner un  o logo aquí */}
          <img 
            src="https://rickandmortyapi.com/api/character/avatar/1.jpeg" 
            alt="Rick Sanchez" 
            className="img-fluid rounded-circle" 
          />
        </Col>
      </Row>
    </Container>
  );
};

export default HeroSection;