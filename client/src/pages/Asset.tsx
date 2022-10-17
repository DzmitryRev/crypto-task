import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import Chart from '../components/Chart/Chart';
import ButtonLink from '../components/Link/Link';
import Loading from '../components/Loading/Loading';
import trpc from '../services/trpc.service';
import { StyledAssetInfo, StyledError } from '../styles';

function Asset() {
  const { assetId } = useParams();

  const { data, error, isLoading } = trpc.useQuery(['asset', assetId as string]);
  const asset = data?.data;

  const { data: history } = trpc.useQuery(['history', assetId as string]);

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
      {isLoading && <Loading />}
      {asset && (
        <>
          <StyledAssetInfo>
            <ButtonLink color="red" path="/">
              back
            </ButtonLink>
            {asset && (
              <>
                <h2>
                  {asset.name}
                  (
                  {asset.symbol}
                  )
                </h2>
                <p>
                  {(+asset.priceUsd).toFixed(2)}
                  $
                </p>
                <p className="change-block">
                  {(+asset.changePercent24Hr).toFixed(2)}
                  %
                </p>

                <ButtonLink color="green" path={`buy/${assetId}`}>
                  add
                </ButtonLink>
              </>
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
