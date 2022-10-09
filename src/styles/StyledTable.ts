import styled from 'styled-components';

const StyledTable = styled.table`
  margin: 0 auto;
  font-weight: 500;
  font-size: 16px;
  line-height: 40px;

  thead {
    font-weight: 700;
  }
  td {
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 15px;
    white-space: nowrap;
    a {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .name-td {
    max-width: 200px;
    min-width: 150px;
    cursor: pointer;
    &:hover {
      background-color: rgba(103, 77, 232, 0.3);
    }
  }
  .price-td,
  .change-td {
    max-width: 100px;
    @media screen and (max-width: 600px) {
      display: none;
    }
  }
  .change-td {
    text-align: right;
  }
  .price-td,
  .change-td,
  .symbol-td,
  .symbol-td-head,
  .price-td-head,
  .profit-td-head {
    @media screen and (max-width: 600px) {
      display: none;
    }
  }
`;

export default StyledTable;