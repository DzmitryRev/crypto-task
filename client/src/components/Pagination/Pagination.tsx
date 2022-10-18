/* eslint-disable linebreak-style */
import Button from '../Button/Button';
import { StyledPagination } from './StyledPagination';

type PaginationPropsType = {
  currentOffset: number;
  setPage: (offset: number) => void;
};

function Pagination({ currentOffset, setPage }: PaginationPropsType) {
  return (
    <StyledPagination data-testid="pagination">
      <Button
        color="blue"
        action={() => {
          setPage(currentOffset - 50);
        }}
        disabled={!currentOffset}
      >
        {'<'}
      </Button>
      <Button
        color="blue"
        action={() => {
          setPage(currentOffset + 50);
        }}
      >
        {'>'}
      </Button>
    </StyledPagination>
  );
}

export default Pagination;
