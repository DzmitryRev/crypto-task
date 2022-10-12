/* eslint-disable linebreak-style */
import React, { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { StyledTableCell } from '../Table/StyledTable';

type TableRowPropsType = {
  id: string;
  name: string;
  symbol: string;
  price: string;
  profit: string;
};

export default function TableRow({
  id,
  name,
  symbol,
  price,
  profit,
  children,
}: PropsWithChildren<TableRowPropsType>) {
  return (
    <tr>
      <StyledTableCell clicable><Link to={`/asset/${id}`}>{name}</Link></StyledTableCell>
      <StyledTableCell breakpoint="600">{symbol}</StyledTableCell>
      <StyledTableCell breakpoint="498">{(+price).toFixed(2)}</StyledTableCell>
      <StyledTableCell breakpoint="398">{(+profit).toFixed(2)}</StyledTableCell>
      {children && <StyledTableCell>{children}</StyledTableCell>}
    </tr>
  );
}
