/* eslint-disable react/jsx-no-useless-fragment */
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Link } from 'react-router-dom';
import Button from '../components/Button/Button';
import Table from '../components/Table/Table';
import TableRow from '../components/TableRow/TableRow';
import PortfolioStorage from '../services/localStorage.service';
import usePortfolio from '../hooks/usePortfolio';
import { StyledTableCell } from '../components/Table/StyledTable';
import Variables from '../styles/variables';

function Portfolio() {
  const { portfolio, assets, loadPortfolio } = usePortfolio();

  return (
    <>
      {portfolio.length ? (
        <Table
          head={(
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell breakpoint={Variables.bp.l}>Symbol</StyledTableCell>
              <StyledTableCell breakpoint={Variables.bp.m}>$</StyledTableCell>
              <StyledTableCell>%</StyledTableCell>
            </TableRow>
          )}
          body={(
            <>
              {portfolio.map((item) => {
                const currentPrice = parseFloat(assets.find((i) => i.id === item.asset.id)?.priceUsd || '0')
                  * item.quantity;

                return (
                  <TableRow key={item.id}>
                    <StyledTableCell maxWidth={110} clicable>
                      <Link to={`/asset/${item.asset.id}`}>{item.asset.name}</Link>
                    </StyledTableCell>
                    <StyledTableCell breakpoint={Variables.bp.l}>
                      {item.asset.symbol}
                    </StyledTableCell>
                    <StyledTableCell maxWidth={90} breakpoint={Variables.bp.m}>
                      {currentPrice ? currentPrice.toFixed(2) : '...'}
                    </StyledTableCell>
                    <StyledTableCell maxWidth={75}>
                      {currentPrice ? (currentPrice - item.total).toFixed(2) : '...'}
                    </StyledTableCell>
                    <StyledTableCell>
                      <Button
                        color="red"
                        action={() => {
                          PortfolioStorage.removeFromPortfolio(item.id);
                          loadPortfolio();
                        }}
                      >
                        <DeleteForeverIcon />
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
    </>
  );
}

export default Portfolio;
