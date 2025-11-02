import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <Container fluid className="bg-light p-5 rounded-3 mb-5 shadow-sm">
      <Row className="align-items-center">
        <Col md={8}>
          <h1 className="display-4 fw-bold">Bienvenido al Universo React</h1>
          <p className="fs-4">
            Explora una increible coleccion de entidades de tu API favorita. Navega, filtra y
            descubre todo lo que este universo tiene para ofrecer.
          </p>
          <Link to="/lista">
            <Button variant="primary" size="lg">
              Comenzar a explorar
            </Button>
          </Link>
        </Col>
        <Col md={4} className="text-center d-none d-md-block">
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
