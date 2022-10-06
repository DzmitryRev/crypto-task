import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import PortfolioStorage from '../services/localStorage.service';
import { fetchAsset } from '../store/slices/assetSlise';
import { useAppDispatch, useAppSelector } from '../store/store';
import { StyledError } from '../styles/wrapper';
import Button from './Button';
import Loading from './Loading';

const StyledBuyAssetBlock = styled.div`
  .buy-asset-name {
    margin-bottom: 5px;
  }
  .buy-asset-price {
    font-weight: 500;
    font-size: 18px;
    margin-bottom: 30px;
  }
  .buy-asset-input-container {
    margin-bottom: 15px;
    input {
      width: 150px;
      font-size: 25px;
      border: 1px solid #333;
      margin: 0 20px 20px 0;
      
    }
  }
  .buy-asset-total {
    display: block;
    font-size: 25px;
    font-weight: 700;
  }
`;

function BuyAsset({ loadPortfolio }: { loadPortfolio: () => void }) {
  const { assetId } = useParams();
  const dispatch = useAppDispatch();
  const { loading, error, asset } = useAppSelector((store) => store.asset);
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState<string>('');
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    dispatch(fetchAsset(assetId as string));
  }, [assetId]);

  useEffect(() => {
    setTotal(Number(asset?.priceUsd) * +quantity);
  }, [quantity]);

  return (
    <div>
      {error ? (
        <StyledError>
          <h4>Something went wrong</h4>
        </StyledError>
      ) : (
        <div>
          {loading ? (
            <Loading />
          ) : (
            <StyledBuyAssetBlock>
              {asset ? (
                <>
                  <h2 className="buy-asset-name">
                    {asset.name}
                    (
                    {asset.symbol}
                    )
                  </h2>
                  <p className="buy-asset-price">
                    {Number(asset.priceUsd).toFixed(2)}
                    $
                  </p>
                  <div className="buy-asset-input-container">
                    <input
                      type="number"
                      min="0"
                      value={quantity}
                      onChange={(e) => {
                        setQuantity(e.target.value);
                      }}
                    />
                    {total ? (
                      <span className="buy-asset-total" title={`${total}`}>
                        {total.toFixed(2)}
                        ...$
                      </span>
                    ) : (
                      ''
                    )}
                  </div>

                  <Button
                    color="green"
                    action={() => {
                      document.body.style.overflow = 'auto';
                      PortfolioStorage.addToPortfolio(asset, total, +quantity);
                      loadPortfolio();
                      navigate(-1);
                    }}
                    disabled={!total}
                  >
                    buy
                  </Button>
                </>
              ) : (
                ''
              )}
            </StyledBuyAssetBlock>
          )}
        </div>
      )}
    </div>
  );
}

export default BuyAsset;
