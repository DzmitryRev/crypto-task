import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button';
import Chart from '../components/Chart';
import Loading from '../components/Loading';
import { fetchAsset, fetchHistory } from '../store/slices/assetSlise';
import { useAppDispatch, useAppSelector } from '../store/store';

const StyledConentContainer = styled.div`
  padding: 0 130px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    font-size: 20px;
    font-weight: 500;
  }
  @media screen and (max-width: 868px) {
    padding: 0;
  }
  @media screen and (max-width: 498px) {
    flex-direction: column;
    align-items: start;
    .back-link,
    .change-block {
      margin-bottom: 10px;
    }
  }
`;

type AssetPagePropsType = {
  children?: React.ReactNode;
};

function AssetPage({ children }: AssetPagePropsType) {
  const { assetId } = useParams();
  const dispatch = useAppDispatch();
  const {
    loading, error, asset, history,
  } = useAppSelector((store) => store.asset);

  useEffect(() => {
    dispatch(fetchAsset(assetId as string));
    dispatch(fetchHistory(assetId as string));
  }, [assetId]);

  return (
    <div>
      {error ? (
        <div>error</div>
      ) : (
        <div>
          {loading ? (
            <Loading />
          ) : (
            <>
              <StyledConentContainer>
                {asset ? (
                  <>
                    <Link to="/" className="back-link">
                      <Button color="red">back</Button>
                    </Link>
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
                    <Link to={`buy/${assetId}`}>
                      <Button color="green">add</Button>
                    </Link>
                  </>
                ) : (
                  ''
                )}
              </StyledConentContainer>
              <Chart history={history} />
            </>
          )}
        </div>
      )}
      {children}
    </div>
  );
}

AssetPage.defaultProps = {
  children: '',
};

export default AssetPage;
