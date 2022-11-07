import { Button, Loading } from 'crypto-components';
import {
  Link, Outlet, useLocation, useParams,
} from 'react-router-dom';
import Chart from '../components/Chart/Chart';
import trpc from '../services/trpc.service';
import { StyledAssetInfo, StyledError } from '../styles';

function Asset() {
  const { assetId } = useParams();

  const { data, error, isLoading } = trpc.useQuery(['asset', assetId as string]);
  const asset = data?.data;

  const { data: history } = trpc.useQuery(['history', assetId as string]);

  const location = useLocation();

  return (
    <div>
      {error && (
        <StyledError>
          <h4>Something went wrong</h4>
          <Button<typeof Link> as={Link} to="/" color="red">
            back
          </Button>
        </StyledError>
      )}
      {isLoading && <Loading />}
      {asset && (
        <>
          <StyledAssetInfo>
            <Button<typeof Link> as={Link} to="/" color="red">
              back
            </Button>
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
                <Button<typeof Link>
                  as={Link}
                  to={`buy/${assetId}`}
                  color="green"
                  state={{ prevLocation: location.pathname }}
                >
                  add
                </Button>
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
