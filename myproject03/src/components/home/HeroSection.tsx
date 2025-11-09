import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <Container
      fluid
      className="bg-white text-dark py-5 mb-5 shadow-sm"
      style={{
        borderBottom: '1px solid #e9ecef',
      }}
    >
      <Container>
        <Row className="align-items-center">
          <Col md={8}>
            <h1 className="display-5 fw-bold mb-3">
              Bienvenido al Universo React
            </h1>
            <p className="fs-5 mb-4 text-secondary">
              Explora una increíble colección de entidades de tu API favorita. 
              Navega, filtra y descubre todo lo que este universo tiene para ofrecer.
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
              className="img-fluid rounded-circle border border-3 border-primary shadow-sm"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default HeroSection;
