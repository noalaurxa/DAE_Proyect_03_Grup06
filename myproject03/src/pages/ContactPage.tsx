import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ContactForm from '../components/contact/ContactForm';

const ContactPage = () => {
  return (

    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col md={10} lg={8}>
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