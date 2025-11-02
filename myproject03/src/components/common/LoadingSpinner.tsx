import { Spinner } from 'react-bootstrap';

const LoadingSpinner = () => {
  return (
    <div className="text-center my-5">
      <Spinner animation="border" variant="primary" role="status">
        <span className="visually-hidden">Cargando...</span>
      </Spinner>
      <p className="mt-2">Cargando...</p>
    </div>
  );
};

export default LoadingSpinner;