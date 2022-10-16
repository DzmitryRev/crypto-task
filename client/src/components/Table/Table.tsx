import React, { PropsWithChildren, ReactNode } from 'react';
import { StyledTable } from './StyledTable';

type TablePropsType = {
  head: ReactNode;
};

function Table({ head, children }: PropsWithChildren<TablePropsType>) {
  if (!children) {
    return null;
  }
  return (
    <StyledTable data-testid="table">
      <thead>{head}</thead>
      <tbody>{children || ''}</tbody>
    </StyledTable>
  );
}

export default Table;
