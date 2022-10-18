import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PortfolioStorage from '../services/localStorage.service';
import { useAppDispatch } from '../store/store';
import Button from '../components/Button/Button';
import Loading from '../components/Loading/Loading';
import { setPortfolio } from '../store/slices/portfolioSlice';
import { StyledBuyAsset, StyledError } from '../styles';
import trpc from '../services/trpc.service';

function BuyAsset() {
  const { assetId } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { data, error, isLoading } = trpc.useQuery(['asset', assetId as string]);
  const asset = data?.data;

  const [quantity, setQuantity] = useState<string>('');
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    setTotalPrice(Number(asset?.priceUsd) * +quantity);
  }, [quantity]);

  return (
    <div>
      {error && (
        <StyledError>
          <h4>Something went wrong</h4>
        </StyledError>
      )}
      {isLoading && <Loading />}
      {asset && (
        <StyledBuyAsset>
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
            {totalPrice ? (
              <span className="buy-asset-total" title={`${totalPrice}`}>
                {totalPrice.toFixed(2)}
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
              PortfolioStorage.addToPortfolio(asset, totalPrice, +quantity);
              dispatch(setPortfolio());
              navigate(-1);
            }}
            disabled={!totalPrice}
          >
            buy
          </Button>
        </StyledBuyAsset>
      )}
    </div>
  );
}

export default BuyAsset;
