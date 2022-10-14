import React, { PropsWithChildren } from 'react';
import { StyledTable } from '../../styles';
import Variables from '../../styles/variables';
import { StyledTableCell } from './StyledTable';

function Table({ children }: PropsWithChildren) {
  if (!children) {
    return null;
  }
  return (
    <StyledTable data-testid="table">
      <thead>
        <tr>
          <StyledTableCell>Name</StyledTableCell>
          <StyledTableCell breakpoint={Variables.bp.l}>Symbol</StyledTableCell>
          <StyledTableCell breakpoint={Variables.bp.m}>$</StyledTableCell>
          <StyledTableCell>%</StyledTableCell>
        </tr>
      </thead>
      <tbody>{children || ''}</tbody>
    </StyledTable>
  );
}

export default Table;
