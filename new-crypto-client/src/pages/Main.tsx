import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { StyledError } from '../styles';
import Variables from '../styles/variables';
import trpc from '../services/trpc.service';
import { Loading, Pagination, Table, TableRow } from "crypto-components";


function Main() {
  const [pageOffset, setPageOffset] = useState(0);
  const { data, error, isLoading } = trpc.useQuery(['assets', { offset: pageOffset, limit: 50 }]);
  const assets = data?.data;
  return (
    <div>
      {error && (
        <StyledError>
          <h4>Something went wrong</h4>
        </StyledError>
      )}
      {isLoading && <Loading />}
      {assets && !isLoading && (
        <>
          <Table
            body={(
              <>
                {assets.map((item) => (
                  <TableRow key={item.id}>
                    {/* <StyledTableCell maxWidth={140} clicable>
                      <Link to={`/asset/${item.id}`}>{item.name}</Link>
                    </StyledTableCell>
                    <StyledTableCell breakpoint={Variables.bp.l}>{item.symbol}</StyledTableCell>
                    <StyledTableCell breakpoint={Variables.bp.m}>
                      {(+item.priceUsd).toFixed(2)}
                    </StyledTableCell>
                    <StyledTableCell>{(+item.changePercent24Hr).toFixed(2)}</StyledTableCell>
                    <StyledTableCell>
                      <ButtonLink color="green" path={`buy/${item.id}`}>
                        add
                      </ButtonLink>
                    </StyledTableCell> */}
                  </TableRow>
                ))}
              </>
            )}
          />
          <Pagination currentOffset={pageOffset} setPage={setPageOffset} />
        </>
      )}
      <Outlet />
    </div>
  );
}

export default Main;
