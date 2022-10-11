import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import Chart from '../components/Chart/Chart';
import ButtonLink from '../components/Link/Link';
import Loading from '../components/Loading/Loading';
import assetsApi from '../store/api/AssetsApi';
import { StyledAssetInfo, StyledError } from '../styles';

function Asset() {
  const { assetId } = useParams();

  const {
    data,
    error,
    isLoading: loading,
  } = assetsApi.useFetchAssetQuery(assetId || '', {
    pollingInterval: 1000,
  });
  const asset = data?.data;

  const { data: history } = assetsApi.useFetchAssetHistoryQuery(assetId || '');

  return (
    <div>
      {error && (
        <StyledError>
          <h4>Something went wrong</h4>
          <ButtonLink color="red" path="/">
            back
          </ButtonLink>
        </StyledError>
      )}
      {loading && <Loading />}
      {asset && (
        <>
          <StyledAssetInfo>
            <ButtonLink color="red" path="/">
              back
            </ButtonLink>
            {asset ? (
              <>
                <h2>
                  {asset.name}
                  (
                  {asset.symbol}
                  )
                </h2>
                <p>
                  {Number(asset.priceUsd).toFixed(2)}
                  $
                </p>
                <p className="change-block">
                  {Number(asset.changePercent24Hr).toFixed(2)}
                  %
                </p>

                <ButtonLink color="green" path={`buy/${assetId}`}>
                  add
                </ButtonLink>
              </>
            ) : (
              ''
            )}
          </StyledAssetInfo>
          {history && <Chart history={history.data} />}
        </>
      )}
      <Outlet />
    </div>
  );
}

export default Asset;
