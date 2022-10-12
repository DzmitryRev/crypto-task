import React, { PropsWithChildren } from 'react';
import { StyledTable } from '../../styles';
import { StyledTableCell } from './StyledTable';

function Table({ children }: PropsWithChildren) {
  return (
    <StyledTable>
      <thead>
        <tr>
          <StyledTableCell>Name</StyledTableCell>
          <StyledTableCell breakpoint="600">Symbol</StyledTableCell>
          <StyledTableCell breakpoint="498">$</StyledTableCell>
          <StyledTableCell>%</StyledTableCell>
        </tr>
      </thead>
      <tbody>
        {children }
      </tbody>
    </StyledTable>
  );
}

export default Table;
