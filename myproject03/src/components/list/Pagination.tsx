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
  const totalPages = paginationInfo.pages;

  // Creamos las páginas visibles con puntos suspensivos
  const pages: (number | string)[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    if (currentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, '...', totalPages);
    } else if (currentPage >= totalPages - 3) {
      pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
  }

  return (
    <Row className="mt-4 align-items-center">
      <Col>
        
      </Col>
      <Col className="d-flex justify-content-end">
        <BootstrapPagination>
          <BootstrapPagination.Prev
            onClick={() => onPageChange(currentPage - 1)}
            disabled={!paginationInfo.prev}
          >
            Prev
          </BootstrapPagination.Prev>

          {pages.map((page, index) =>
            typeof page === 'string' ? (
              <BootstrapPagination.Ellipsis key={`ellipsis-${index}`} disabled />
            ) : (
              <BootstrapPagination.Item
                key={page}
                active={page === currentPage}
                onClick={() => onPageChange(page)}
              >
                {page}
              </BootstrapPagination.Item>
            )
          )}

          <BootstrapPagination.Next
            onClick={() => onPageChange(currentPage + 1)}
            disabled={!paginationInfo.next}
          >
            Next
          </BootstrapPagination.Next>
        </BootstrapPagination>
      </Col>
    </Row>
  );
};

export default Pagination;
