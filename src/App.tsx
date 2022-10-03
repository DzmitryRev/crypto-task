import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import BuyAsset from './components/BuyAsset';
import Header from './components/Header';
import Modal from './components/Modal';
import AssetPage from './pages/AssetPage';
import MainPage from './pages/MainPage';
import PortfolioPage from './pages/PortfolioPage';
import { Wrapper } from './styles/wrapper';

function App() {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/asset/:assetId" element={<AssetPage />} />
          <Route
            path="/buy/:assetId"
            element={(
              <MainPage>
                <Modal
                  isOpen
                  closeCallback={() => {
                    navigate(-1);
                  }}
                >
                  <BuyAsset />
                </Modal>
              </MainPage>
            )}
          />
          <Route
            path="asset/:assetId/buy/:assetId"
            element={(
              <AssetPage>
                <Modal
                  isOpen
                  closeCallback={() => {
                    navigate(-1);
                  }}
                >
                  <BuyAsset />
                </Modal>
              </AssetPage>
            )}
          />
          <Route
            path="asset/:assetId/portfolio"
            element={(
              <AssetPage>
                <Modal
                  isOpen
                  closeCallback={() => {
                    navigate(-1);
                  }}
                >
                  <PortfolioPage />
                </Modal>
              </AssetPage>
            )}
          />
          <Route
            path="/portfolio"
            element={(
              <MainPage>
                <Modal
                  isOpen
                  closeCallback={() => {
                    navigate(-1);
                  }}
                >
                  <PortfolioPage />
                </Modal>
              </MainPage>
            )}
          />
        </Routes>
      </div>
    </Wrapper>
  );
}

export default App;
