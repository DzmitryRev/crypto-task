import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Modal from './components/Modal/Modal';
import Asset from './pages/Asset';
import Main from './pages/Main';
import Portfolio from './pages/Portfolio';
import BuyAsset from './pages/BuyAsset';
import { StyledWrapper } from './styles';

function App() {
  return (
    <StyledWrapper>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="portfolio" element={<Modal><Portfolio /></Modal>} />
            <Route
              path="buy/:assetId"
              element={(<Modal><BuyAsset /></Modal>)}
            />
          </Route>
          <Route path="/asset/:assetId" element={<Asset />}>
            <Route
              path="buy/:assetId"
              element={(<Modal><BuyAsset /></Modal>)}
            />
            <Route path="portfolio" element={<Modal><Portfolio /></Modal>} />
          </Route>
        </Routes>
      </div>
    </StyledWrapper>
  );
}

export default App;
