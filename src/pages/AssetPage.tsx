import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import { fetchAsset } from '../store/slices/assetSlise';
import { useAppDispatch, useAppSelector } from '../store/store';

type AssetPagePropsType = {
  children?: React.ReactNode,
};

function AssetPage({ children }: AssetPagePropsType) {
  const { assetId } = useParams();
  const dispatch = useAppDispatch();
  const { loading, error, asset } = useAppSelector((store) => store.asset);
  useEffect(() => {
    dispatch(fetchAsset(assetId as string));
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      {error ? <div>error</div> : (
        <div>
          {loading ? 'Loading...' : (
            <div>
              <Button color="red" action={() => { navigate(-1); }}>
                back
              </Button>
              <span>
                {asset?.name}

                (
                {asset?.symbol}
                )
                {' '}
                {asset?.priceUsd}
              </span>
              <Link to={`buy/${assetId}`}>
                <Button color="green">
                  add
                </Button>
              </Link>
            </div>
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
