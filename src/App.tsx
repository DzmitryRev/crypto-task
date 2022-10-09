import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Modal from './components/Modal';
// import useProfit from './hooks/useProfit';
import Asset from './pages/Asset';
import Main from './pages/Main';
import Portfolio from './pages/Portfolio';
import BuyAsset from './pages/BuyAsset';
import StyledWrapper from './styles/StyledWrapper';

function App() {
  const navigate = useNavigate();

  //   const { portfolio, loadPortfolio, assets } = useProfit();

  return (
    <StyledWrapper>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/asset/:assetId" element={<Asset />} />
          <Route
            path="/buy/:assetId"
            element={(
              <Main>
                <Modal
                  isOpen
                  closeCallback={() => {
                    navigate(-1);
                  }}
                >
                  <BuyAsset />
                </Modal>
              </Main>
            )}
          />
          <Route
            path="asset/:assetId/buy/:assetId"
            element={(
              <Asset>
                <Modal
                  isOpen
                  closeCallback={() => {
                    navigate(-1);
                  }}
                >
                  <BuyAsset />
                </Modal>
              </Asset>
            )}
          />
          <Route
            path="asset/:assetId/portfolio"
            element={(
              <Asset>
                <Modal
                  isOpen
                  closeCallback={() => {
                    navigate(-1);
                  }}
                >
                  <Portfolio />
                </Modal>
              </Asset>
            )}
          />
          <Route
            path="/portfolio"
            element={(
              <Main>
                <Modal
                  isOpen
                  closeCallback={() => {
                    navigate(-1);
                  }}
                >
                  <Portfolio />
                </Modal>
              </Main>
            )}
          />
        </Routes>
      </div>
    </StyledWrapper>
  );
}

export default App;
