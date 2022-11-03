import { Modal } from "crypto-components";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Asset from "./pages/Asset";
import BuyAsset from "./pages/BuyAsset";
import Main from "./pages/Main";
import Portfolio from "./pages/Portfolio";
import trpc from "./services/trpc.service";
import { StyledWrapper } from "./styles";

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: "http://localhost:4040/trpc",
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <StyledWrapper>
          <Header />
          <div>
            <Routes>
              <Route path="/" element={<Main />}>
                <Route
                  path="portfolio"
                  element={
                    <Modal type="regular">
                      <Portfolio />
                    </Modal>
                  }
                />
                <Route
                  path="buy/:assetId"
                  element={
                    <Modal type="minified">
                      <BuyAsset />
                    </Modal>
                  }
                />
              </Route>
              <Route path="/asset/:assetId" element={<Asset />}>
                <Route
                  path="buy/:assetId"
                  element={
                    <Modal type="minified">
                      <BuyAsset />
                    </Modal>
                  }
                />
                <Route
                  path="portfolio"
                  element={
                    <Modal type="regular">
                      <Portfolio />
                    </Modal>
                  }
                />
              </Route>
            </Routes>
          </div>
        </StyledWrapper>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
