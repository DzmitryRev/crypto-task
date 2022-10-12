import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Table from '../components/Table/Table';
import Button from '../components/Button/Button';
import ButtonLink from '../components/Link/Link';
import Loading from '../components/Loading/Loading';
import TableRow from '../components/TableRow/TableRow';
import assetsApi from '../store/api/AssetsApi';
import { StyledError, StyledPagination } from '../styles';
import { StyledTableCell } from '../components/Table/StyledTable';

function Main() {
  const [pageOffset, setPageOffset] = useState(0);
  const {
    data,
    error,
    isFetching: loading,
  } = assetsApi.useFetchAllAssetsQuery(
    { offset: pageOffset, limit: 50 },
    {
      refetchOnMountOrArgChange: true,
    },
  );
  const assets = data?.data;

  return (
    <div>
      {error && (
        <StyledError>
          <h4>Something went wrong</h4>
        </StyledError>
      )}
      {loading && <Loading />}
      {assets && !loading && (
        <>
          <Table>
            {assets.map((item) => (
              <TableRow>
                <StyledTableCell clicable>
                  <Link to={`/asset/${item.id}`}>{item.name}</Link>
                </StyledTableCell>
                <StyledTableCell breakpoint="600">{item.symbol}</StyledTableCell>
                <StyledTableCell breakpoint="498">{(+item.priceUsd).toFixed(2)}</StyledTableCell>
                <StyledTableCell breakpoint="398">{(+item.changePercent24Hr).toFixed(2)}</StyledTableCell>
                <StyledTableCell>
                  <ButtonLink color="green" path={`buy/${item.id}`}>
                    add
                  </ButtonLink>
                </StyledTableCell>

              </TableRow>
            ))}
          </Table>

          <StyledPagination>
            <Button
              color="green"
              action={() => {
                setPageOffset(pageOffset - 50);
              }}
              disabled={!pageOffset}
            >
              {'<'}
            </Button>
            <Button
              color="green"
              action={() => {
                setPageOffset(pageOffset + 50);
              }}
            >
              {'>'}
            </Button>
          </StyledPagination>
        </>
      )}
      <Outlet />
    </div>
  );
}

export default Main;
