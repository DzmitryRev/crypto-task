import React, { useEffect } from 'react';
import Header from './components/Header';
import { fetchAssets } from './store/slices/assetsSlice';
import { useAppDispatch } from './store/store';
import Wrapper from './styles/wrapper';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAssets());
  }, []);
  return (
    <Wrapper>
      <Header />
    </Wrapper>
  );
}

export default App;
