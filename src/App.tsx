import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Modal from './components/Modal';
import Asset from './pages/Asset';
import Main from './pages/Main';
import Portfolio from './pages/Portfolio';
import BuyAsset from './pages/BuyAsset';
import StyledWrapper from './styles/StyledWrapper';

function App() {
  const navigate = useNavigate();

  const PortfolioModal = (
    <Modal
      isOpen
      closeCallback={() => {
        navigate(-1);
      }}
    >
      <Portfolio />
    </Modal>
  );

  const BuyAssetModal = (
    <Modal
      isOpen
      closeCallback={() => {
        navigate(-1);
      }}
    >
      <BuyAsset />
    </Modal>
  );

  return (
    <StyledWrapper>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="portfolio" element={PortfolioModal} />
            <Route path="buy/:assetId" element={BuyAssetModal} />
          </Route>
          <Route path="/asset/:assetId" element={<Asset />}>
            <Route path="buy/:assetId" element={BuyAssetModal} />
            <Route path="portfolio" element={PortfolioModal} />
          </Route>
        </Routes>
      </div>
    </StyledWrapper>
  );
}

export default App;
