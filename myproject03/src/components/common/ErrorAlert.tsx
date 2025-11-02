import { Alert } from 'react-bootstrap';

const ErrorAlert = ({ message }: { message?: string }) => {
  return (
    <Alert variant="danger">
      <Alert.Heading>¡Oh no! Ha ocurrido un error</Alert.Heading>
      <p>{message || 'No se pudieron cargar los datos. Inténtalo de nuevo más tarde.'}</p>
    </Alert>
  );
};

export default ErrorAlert;
