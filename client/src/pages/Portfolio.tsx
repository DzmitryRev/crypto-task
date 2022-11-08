import { Link } from 'react-router-dom';
import {
  Button, StyledTableCell, Table, TableRow,
} from 'crypto-components';
import PortfolioStorage from '../services/localStorage.service';
import Variables from '../styles/variables';
import usePortfolio from '../hooks/usePortfolio';

function Portfolio() {
  const { portfolio, assets, loadPortfolio } = usePortfolio();
  return (
    <div>
      {portfolio.length ? (
        <Table
          body={(
            <>
              {portfolio.map((item) => {
                const currentPrice = parseFloat(assets.find((i) => i.id === item.asset.id)?.priceUsd || '0')
                    * item.quantity || 0;
                const profit = `${(((currentPrice - item.total) / item.total) * 100).toFixed(2)}%`;
                return (
                  <TableRow key={item.id}>
                    <StyledTableCell maxWidth={110} clicable>
                      <Link to={`/asset/${item.asset.id}`}>{item.asset.name}</Link>
                    </StyledTableCell>
                    <StyledTableCell breakpoint={Variables.bp.l}>
                      {item.asset.symbol}
                    </StyledTableCell>
                    <StyledTableCell
                      maxWidth={110}
                      breakpoint={Variables.bp.m}
                      title={currentPrice.toFixed(2)}
                    >
                      {currentPrice.toFixed(2)}
                    </StyledTableCell>
                    <StyledTableCell maxWidth={100} title={profit}>
                      {profit}
                    </StyledTableCell>
                    <StyledTableCell>
                      <Button
                        as="button"
                        color="red"
                        onClick={() => {
                          PortfolioStorage.removeFromPortfolio(item.id);
                          loadPortfolio();
                        }}
                      >
                        delete
                      </Button>
                    </StyledTableCell>
                  </TableRow>
                );
              })}
            </>
          )}
        />
      ) : (
        <p>You have not assets</p>
      )}
    </div>
  );
}

export default Portfolio;
