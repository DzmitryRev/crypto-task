import { AssetType } from '../types/types';
import { StorageAssetType } from './localStorage.service';

export function calculateProfitSum(portfolio: StorageAssetType[], assets: AssetType[]) {
  let sum = 0;

  portfolio.forEach((item) => {
    const currentPrice = parseFloat(assets.find((i) => i.id === item.asset.id)?.priceUsd || '0') * item.quantity || 0;
    sum += currentPrice - item.total;
  });

  return sum;
}

export function calculateSum(portfolio: StorageAssetType[]) {
  return portfolio.reduce((accumulator, obj) => accumulator + obj.total, 0);
}
