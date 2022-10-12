import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Table from '../components/Table/Table';
import Button from '../components/Button/Button';
import ButtonLink from '../components/Link/Link';
import Loading from '../components/Loading/Loading';
import TableRow from '../components/TableRow/TableRow';
import assetsApi from '../store/api/AssetsApi';
import { StyledError, StyledPagination } from '../styles';

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
          {/* =================== Completed */}
          <Table>
            {assets.map((item) => (
              <TableRow
                id={item.id}
                key={item.id}
                name={item.name}
                symbol={item.symbol}
                price={item.priceUsd}
                profit={item.changePercent24Hr}
              >
                <ButtonLink color="green" path={`buy/${item.id}`}>
                  add
                </ButtonLink>
              </TableRow>
            ))}
          </Table>
          {/* =========================== Completed */}

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
