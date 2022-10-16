import React, { useState } from 'react';
// import { Route, Routes } from 'react-router-dom';
import { createReactQueryHooks } from '@trpc/react';
import { AppRouter } from 'server';
import { ReactQueryDevtools } from 'react-query/devtools';
// import Header from './components/Header/Header';
// import Modal from './components/Modal/Modal';
// import Asset from './pages/Asset';
// import Main from './pages/Main';
// import Portfolio from './pages/Portfolio';
// import BuyAsset from './pages/BuyAsset';
// import { StyledWrapper } from './styles';
import { QueryClient, QueryClientProvider } from 'react-query';

export const trpc = createReactQueryHooks<AppRouter>();

function AppContent() {
  const hello = trpc.useQuery(['hello']);
  return <main className="p-2">{hello.data?.name}</main>;
}

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => trpc.createClient({
    url: 'http://localhost:4000/trpc',
  }));
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <AppContent />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </trpc.Provider>
    // <StyledWrapper>
    //   <Header />
    //   <div>
    //     <Routes>
    //       <Route path="/" element={<Main />}>
    //         <Route
    //           path="portfolio"
    //           element={(
    //             <Modal type="default">
    //               <Portfolio />
    //             </Modal>
    //           )}
    //         />
    //         <Route
    //           path="buy/:assetId"
    //           element={(
    //             <Modal type="minify">
    //               <BuyAsset />
    //             </Modal>
    //           )}
    //         />
    //       </Route>
    //       <Route path="/asset/:assetId" element={<Asset />}>
    //         <Route
    //           path="buy/:assetId"
    //           element={(
    //             <Modal type="minify">
    //               <BuyAsset />
    //             </Modal>
    //           )}
    //         />
    //         <Route
    //           path="portfolio"
    //           element={(
    //             <Modal type="default">
    //               <Portfolio />
    //             </Modal>
    //           )}
    //         />
    //       </Route>
    //     </Routes>
    //   </div>
    // </StyledWrapper>
  );
}

export default App;
