// src/components/list/FilterBar.jsx
import { useState } from 'react';
import { Row, Col, Form, Button, InputGroup } from 'react-bootstrap';

// Recibimos las funciones y los valores actuales desde el hook
const FilterBar = ({ onFilter, onClear, initialFilters }) => {
  // Estado local para manejar los campos del formulario
  const [filters, setFilters] = useState({
    name: initialFilters.get('name') || '',
    status: initialFilters.get('status') || '',
  });

  // Actualiza el estado local cuando se escribe en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Llama a la función del hook cuando se presiona "Filtrar"
  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  // Llama a la función del hook cuando se presiona "Limpiar"
  const handleClear = () => {
    setFilters({ name: '', status: '' }); // Limpia el formulario local
    onClear(); // Llama a la función del hook
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4 p-4 bg-light rounded-3 shadow-sm">
      <Row className="align-items-end g-3">
        {/* Filtro por Nombre */}
        <Col md={4}>
          <Form.Group controlId="filterName">
            <Form.Label>Filtrar por Nombre</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Ej. Rick, Morty..."
              value={filters.name}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>

        {/* Filtro por Estado */}
        <Col md={3}>
          <Form.Group controlId="filterStatus">
            <Form.Label>Estado</Form.Label>
            <Form.Select
              name="status"
              value={filters.status}
              onChange={handleChange}
            >
              <option value="">Cualquiera</option>
              <option value="alive">Vivo</option>
              <option value="dead">Muerto</option>
              <option value="unknown">Desconocido</option>
            </Form.Select>
          </Form.Group>
        </Col>

        {/* Botones */}
        <Col md={5} className="d-flex gap-2">
          <Button type="submit" variant="primary">
            Filtrar
          </Button>
          <Button type="button" variant="outline-secondary" onClick={handleClear}>
            Limpiar Filtros
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default FilterBar;