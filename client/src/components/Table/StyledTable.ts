/* eslint-disable linebreak-style */
import styled from 'styled-components';

export const StyledTable = styled.table`
  margin: 0 auto 20px;
  max-width: 600px;
  font-weight: 500;
  font-size: 16px;
  line-height: 40px;

  thead {
    font-weight: 700;
  }

  a {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

type StyledTableCellProps = {
  breakpoint?: number;
  clicable?: boolean;
  maxWidth?: number;
};

export const StyledTableCell = styled.td<StyledTableCellProps>`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 15px;
  max-width: ${(props) => props.maxWidth}px;
  width: ${(props) => props.maxWidth}px;
  ${(props) => props.clicable
    && `cursor: pointer;
    &:hover {
      background-color: rgba(103, 77, 232, 0.3);
    }`}
  @media screen and (max-width: ${(props) => props.breakpoint}px) {
    display: none;
  }
`;
