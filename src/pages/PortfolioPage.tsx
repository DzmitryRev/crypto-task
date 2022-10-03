/* eslint-disable linebreak-style */
import React, { useEffect, useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import styled from 'styled-components';
import PortfolioStorage, { StorageAssetType } from '../services/localStorage.service';

const StyledTable = styled.table`
  width: 100%;
  td {
    font-weight: 500;
    padding: 10px;
  }
`;

function PortfolioPage() {
  const [portfolio, setPortfolio] = useState<StorageAssetType[]>([]);
  const loadPortfolio = () => {
    setPortfolio(PortfolioStorage.getPortfolio());
  };
  useEffect(() => {
    loadPortfolio();
  }, []);
  return (
    <StyledTable>
      {portfolio.length ? portfolio.map((item) => (
        <tr>
          <td>{item.asset.name}</td>
          {' '}
          <td>
            {item.total.toFixed(2)}
            $
          </td>
          <td>{item.quantity}</td>
          <td>
            <DeleteForeverIcon onClick={() => {
              PortfolioStorage.removeFromPortfolio(item.id);
              loadPortfolio();
            }}
            />
          </td>
        </tr>
      )) : <tr><td>You have not assets</td></tr>}
    </StyledTable>
  );
}

export default PortfolioPage;
