import { useEffect } from 'react';
import { cleanAssets, fetchPortfolioAsset, setPortfolio } from '../store/slices/portfolioSlice';
import { useAppDispatch, useAppSelector } from '../store/store';

function usePortfolio() {
  const dispatch = useAppDispatch();
  const {
    portfolio, assets, sum, profit,
  } = useAppSelector((store) => store.portfolio);
  const loadPortfolio = () => {
    dispatch(setPortfolio());
  };

  useEffect(() => {
    loadPortfolio();
  }, []);

  useEffect(() => {
    portfolio.forEach((item) => {
      dispatch(fetchPortfolioAsset(item.asset.id));
    });
    return () => {
      dispatch(cleanAssets());
    };
  }, [portfolio]);

  return {
    portfolio,
    assets,
    sum,
    profit,
    loadPortfolio,
  };
}

export default usePortfolio;
