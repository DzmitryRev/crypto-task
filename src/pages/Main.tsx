import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AssetField from '../components/AssetTableRow';
import Button from '../components/Button';
import Loading from '../components/Loading';
import assetsApi from '../store/api/AssetsApi';
import StyledError from '../styles/StyledError';
import StyledPagination from '../styles/StyledPagination';
import StyledTable from '../styles/StyledTable';

function Main() {
  const [pageOffset, setPageOffset] = useState(0);
  const {
    data,
    error,
    isFetching: loading,
  } = assetsApi.useFetchAllAssetsQuery({ offset: pageOffset, limit: 50 }, {
    refetchOnMountOrArgChange: true,
  });
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
          <StyledTable>
            <thead>
              <tr>
                <td>Name</td>
                <td className="symbol-td-head">Symbol</td>
                <td className="price-td-head">Price</td>
                <td className="profit-td-head">Profit</td>
              </tr>
            </thead>
            <tbody>
              {assets.map((item) => (
                <AssetField
                  key={item.id}
                  id={item.id}
                  price={item.priceUsd}
                  name={item.name}
                  changePerDay={item.changePercent24Hr}
                  symbol={item.symbol}
                />
              ))}
            </tbody>
          </StyledTable>
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
