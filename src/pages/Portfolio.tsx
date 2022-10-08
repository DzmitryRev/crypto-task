/* eslint-disable linebreak-style */
import React from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import styled from 'styled-components';
import PortfolioStorage, { StorageAssetType } from '../services/localStorage.service';
import { AssetType } from '../store/assets.model';

const StyledTable = styled.table`
  width: 100%;
  td {
    font-weight: 500;
    padding: 10px;
  }
  thead {
    td {
      font-weight: 700;
    }
  }
`;

type PortfolioPageType = {
  loadPortfolio: () => void;
  assets: AssetType[];
  portfolio: StorageAssetType[];
};

function Portfolio({ loadPortfolio, portfolio, assets }: PortfolioPageType) {
  return (
    <StyledTable>
      <thead>
        {portfolio.length ? (
          <tr>
            <td>name</td>
            <td>price</td>
            <td>quant.</td>
          </tr>
        ) : (
          <tr />
        )}
      </thead>
      <tbody>
        {portfolio.length ? (
          portfolio.map((item) => {
            const currentPrice = parseFloat(assets.find((i) => i.id === item.asset.id)?.priceUsd || '0')
              * item.quantity;
            return (
              <tr key={item.id}>
                <td>{item.asset.name}</td>
                <td title={`${item.total}`}>
                  {currentPrice.toFixed(2)}
                  $
                  {' '}
                  {assets.length ? `(${(currentPrice - item.total).toFixed(2)})` : ''}
                </td>
                <td>
                  <DeleteForeverIcon
                    onClick={() => {
                      PortfolioStorage.removeFromPortfolio(item.id);
                      loadPortfolio();
                    }}
                  />
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td>You have not assets</td>
          </tr>
        )}
      </tbody>
    </StyledTable>
  );
}

export default Portfolio;
