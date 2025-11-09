import { Container, Row, Col, Image } from 'react-bootstrap';
import ContactForm from '../components/contact/ContactForm';

const ContactPage = () => {
  return (
    <Container className="my-5 p-4">
      <Row className="align-items-center">
        {/* Columna con imagen */}
        <Col
          xs={12}
          md={6}
          className="d-flex justify-content-center align-items-center"
          style={{ height: '100%' }}
        >
          <Image
            src="/foto.jpg"  
            alt="Contáctanos"
            fluid
            rounded
            style={{
              width: '600px',
              height: '600px',
              objectFit: 'cover', 
              borderRadius: '0.5rem',
            }}
          />
        </Col>

        {/* Columna con formulario */}
        <Col xs={12} md={6}>
          <h1 className="text-center mb-4">Ponte en Contacto</h1>
          <p className="text-center text-muted mb-4">
            ¿Tienes alguna pregunta o sugerencia? Rellena el formulario y
            nos pondremos en contacto contigo lo antes posible.
          </p>
          <ContactForm />
        </Col>
      </Row>
    </Container>
  );
};

export default ContactPage;
