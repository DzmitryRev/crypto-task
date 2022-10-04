/* eslint-disable linebreak-style */
import { useEffect, useState } from 'react';
import PortfolioStorage, { StorageAssetType } from '../services/localStorage.service';
import { clean, fetchPortfolioAsset } from '../store/slices/portfolioSlice';
import { useAppDispatch, useAppSelector } from '../store/store';

function useProfit() {
  const [portfolio, setPortfolio] = useState<StorageAssetType[]>([]);
  const dispatch = useAppDispatch();
  const { assets } = useAppSelector((store) => store.portfolio);
  const loadPortfolio = () => {
    setPortfolio(PortfolioStorage.getPortfolio());
    portfolio.forEach((item) => {
      dispatch(fetchPortfolioAsset(item.asset.id));
    });
  };

  useEffect(() => {
    loadPortfolio();
  }, []);

  useEffect(() => {
    portfolio.forEach((item) => {
      dispatch(fetchPortfolioAsset(item.asset.id));
    });
    return () => {
      dispatch(clean());
    };
  }, [portfolio]);

  return {
    portfolio, assets, loadPortfolio,
  };
}

export default useProfit;
