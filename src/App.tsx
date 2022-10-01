import React, { useEffect } from 'react';
import Header from './components/Header';
import { fetchAssets } from './store/slices/assetsSlice';
import { useAppDispatch, useAppSelector } from './store/store';
import Wrapper from './styles/wrapper';

function App() {
  const dispatch = useAppDispatch();
  const { loading, error, assets } = useAppSelector((store) => store.assets);

  useEffect(() => {
    dispatch(fetchAssets());
  }, []);

  return (
    <Wrapper>
      <Header />
      {error ? <div>error</div> : (
        <div>
          {loading ? 'Loading...' : assets.map((item) => (
            <div key={item.id}>
              {item.id}
              {item.volumeUsd24Hr}
            </div>
          ))}
        </div>
      )}
    </Wrapper>
  );
}

export default App;
