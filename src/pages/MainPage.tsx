import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAssets } from '../store/slices/assetsSlice';
import { useAppDispatch, useAppSelector } from '../store/store';

type MainPagePropsType = {
  children?: React.ReactNode,
};

function MainPage({ children = '' }: MainPagePropsType) {
  const dispatch = useAppDispatch();
  const { loading, error, assets } = useAppSelector((store) => store.assets);

  useEffect(() => {
    dispatch(fetchAssets());
  }, []);

  return (
    <div>
      {error ? <div>error</div> : (
        <div>
          {loading ? 'Loading...' : assets.map((item) => (
            <div key={item.id}>
              <Link to={`/asset/${item.id}`}>
                {item.id}
                {item.volumeUsd24Hr}
              </Link>
            </div>
          ))}
        </div>
      )}
      {children}
    </div>
  );
}

MainPage.defaultProps = {
  children: '',
};

export default MainPage;
