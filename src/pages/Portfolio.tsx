import React from 'react';
// import Table from '../components/AssetTableRow/Table';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import styled from 'styled-components';
// import PortfolioStorage from '../services/localStorage.service';
import usePortfolio from '../hooks/usePortfolio';
import { StyledTable } from '../styles';
// import AssetTableRow from '../components/AssetTableRow/Table';
// import ButtonLink from '../components/Link/Link';
// import Button from '../components/Button/Button';

// const StyledTable = styled.table`
//   width: 100%;
//   font-size: 14px;
//   td {
//     max-width: 100px;
//     font-weight: 500;
//     padding: 5px;
//     text-align: center;
//     overflow: hidden;
//     text-overflow: ellipsis;
//   }
//   thead {
//     td {
//       font-weight: 700;
//     }
//   }
// `;

function Portfolio() {
  const { portfolio, assets, loadPortfolio } = usePortfolio();

  console.log(loadPortfolio);

  return (
    <StyledTable>
      <thead>
        {portfolio.length ? (
          <tr>
            <td>name</td>
            <td>symbol</td>
            <td>price</td>
            <td>profit</td>
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
              <div>{currentPrice}</div>
            //   <Table>

            //   <AssetTableRow
            //     id={item.id}
            //     name={item.asset.name}
            //     symbol={item.asset.symbol}
            //     price={currentPrice.toFixed(2)}
            //     changePerDay={`${(currentPrice - item.total).toFixed(2)}`}
            //     actionButton={(
            //       <Button
            //         color="red"
            //         action={() => {
            //           PortfolioStorage.removeFromPortfolio(item.id);
            //           loadPortfolio();
            //         }}
            //       >
            //         <DeleteForeverIcon />
            //       </Button>
            //     )}
            //   />
            //   <tr key={item.id}>
            //     <td>{item.asset.name}</td>
            //     <td title={`${item.total}`}>
            //       {currentPrice.toFixed(2)}
            //       $
            //       {' '}
            //       {assets.length ? `(${(currentPrice - item.total).toFixed(2)})` : ''}
            //     </td>
            //     <td>
            //       <DeleteForeverIcon
            //         onClick={() => {
            //           PortfolioStorage.removeFromPortfolio(item.id);
            //           loadPortfolio();
            //         }}
            //       />
            //     </td>
            //   </tr>
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
