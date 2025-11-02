import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

interface FiltersState {
  name: string;
  status: string;
  [key: string]: string;
}

interface FilterBarProps {
  onFilter: (filters: FiltersState) => void;
  onClear: () => void;
  initialFilters: URLSearchParams;
}

const FilterBar = ({ onFilter, onClear, initialFilters }: FilterBarProps) => {
  const [filters, setFilters] = useState<FiltersState>({
    name: initialFilters.get('name') ?? '',
    status: initialFilters.get('status') ?? '',
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onFilter(filters);
  };

  const handleClear = () => {
    setFilters({ name: '', status: '' });
    onClear();
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4 p-4 bg-light rounded-3 shadow-sm">
      <Row className="align-items-end g-3">
        <Col md={4}>
          <Form.Group controlId="filterName">
            <Form.Label>Filtrar por nombre</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Ej. Rick, Morty..."
              value={filters.name}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group controlId="filterStatus">
            <Form.Label>Estado</Form.Label>
            <Form.Select name="status" value={filters.status} onChange={handleChange}>
              <option value="">Cualquiera</option>
              <option value="alive">Vivo</option>
              <option value="dead">Muerto</option>
              <option value="unknown">Desconocido</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={5} className="d-flex gap-2">
          <Button type="submit" variant="primary">
            Filtrar
          </Button>
          <Button type="button" variant="outline-secondary" onClick={handleClear}>
            Limpiar filtros
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default FilterBar;
