// src/components/list/Pagination.jsx
import { Pagination as BootstrapPagination, Col, Row } from 'react-bootstrap';

// Recibe la info de paginación y la función para cambiar de página
const Pagination = ({ paginationInfo, onPageChange }) => {
  if (!paginationInfo || paginationInfo.pages <= 1) {
    return null; // No mostrar paginación si no hay o es solo 1 página
  }

  // Sacamos la página actual de la URL de 'next' o 'prev'
  // La API nos da '...page=3'. Si no hay 'prev' (es pág 1), no hay 'prev.
  const currentPage = paginationInfo.prev ? parseInt(paginationInfo.prev.split('page=')[1]) + 1 : 1;

  return (
    <Row className="mt-4 align-items-center">
      <Col>
        <p className="mb-0">
          Página <strong>{currentPage}</strong> de <strong>{paginationInfo.pages}</strong>
        </p>
      </Col>
      <Col className="d-flex justify-content-end">
        <BootstrapPagination>
          {/* Botón Anterior */}
          <BootstrapPagination.Prev
            onClick={() => onPageChange(currentPage - 1)}
            disabled={!paginationInfo.prev} // Deshabilitado si no hay pág previa
          />

          {/* Botón Siguiente */}
          <BootstrapPagination.Next
            onClick={() => onPageChange(currentPage + 1)}
            disabled={!paginationInfo.next} // Deshabilitado si no hay pág siguiente
          />
        </BootstrapPagination>
      </Col>
    </Row>
  );
};

export default Pagination;