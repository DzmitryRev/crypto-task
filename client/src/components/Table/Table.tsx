import { PropsWithChildren, ReactNode } from 'react';
import { StyledTable } from './StyledTable';

type TablePropsType = {
  head: ReactNode;
  body: ReactNode;
};

function Table({ head, body }: PropsWithChildren<TablePropsType>) {
  return (
    <StyledTable data-testid="table">
      <thead>{head}</thead>
      <tbody>{body}</tbody>
    </StyledTable>
  );
}

export default Table;
