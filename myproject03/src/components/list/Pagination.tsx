import { Col, Pagination as BootstrapPagination, Row } from 'react-bootstrap';
import type { PaginationInfo } from '../../services/entityService';

interface PaginationProps {
  paginationInfo: PaginationInfo | null;
  onPageChange: (page: number) => void;
}

const resolveCurrentPage = (info: PaginationInfo): number => {
  const parsePage = (link: string | null, adjust: number) => {
    if (!link) {
      return undefined;
    }

    try {
      const pageParam = new URL(link).searchParams.get('page');
      if (!pageParam) {
        return undefined;
      }
      const pageNumber = Number(pageParam);
      if (Number.isNaN(pageNumber)) {
        return undefined;
      }
      return pageNumber + adjust;
    } catch {
      return undefined;
    }
  };

  return parsePage(info.next, -1) ?? parsePage(info.prev, 1) ?? 1;
};

const Pagination = ({ paginationInfo, onPageChange }: PaginationProps) => {
  if (!paginationInfo || paginationInfo.pages <= 1) {
    return null;
  }

  const currentPage = resolveCurrentPage(paginationInfo);

  return (
    <Row className="mt-4 align-items-center">
      <Col>
        <p className="mb-0">
          Pagina <strong>{currentPage}</strong> de <strong>{paginationInfo.pages}</strong>
        </p>
      </Col>
      <Col className="d-flex justify-content-end">
        <BootstrapPagination>
          <BootstrapPagination.Prev
            onClick={() => onPageChange(currentPage - 1)}
            disabled={!paginationInfo.prev}
          />
          <BootstrapPagination.Next
            onClick={() => onPageChange(currentPage + 1)}
            disabled={!paginationInfo.next}
          />
        </BootstrapPagination>
      </Col>
    </Row>
  );
};

export default Pagination;
