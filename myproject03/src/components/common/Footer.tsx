import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center">
      <Container>
        <p>&copy; {new Date().getFullYear()} Mi Proyecto API. Todos los derechos reservados.</p>
      </Container>
    </footer>
  );
};

export default Footer;