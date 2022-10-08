/* eslint-disable linebreak-style */
// const prevSum = portfolio.reduce((accumulator, obj) => accumulator + obj.total, 0);
// let newSum = 0;
// portfolio.forEach((item) => {
//   const newItem = assets.find((i) => i.id === item.asset.id);
//   if (newItem) newSum += parseFloat(newItem?.priceUsd) * item.quantity;
// });
// setPrev(prevSum);
// setSum(newSum);
// setProfit(newSum - prevSum);

import { AssetType } from '../store/assets.model';
import { StorageAssetType } from './localStorage.service';

export function calculateProfitSum(portfolio: StorageAssetType[], assets: AssetType[]) {
  let sum = 0;
  portfolio.forEach((item) => {
    const newItem = assets.find((i) => i.id === item.asset.id);
    if (newItem) sum += parseFloat(newItem?.priceUsd) * item.quantity;
  });
  return sum;
}

export function calculateSum(portfolio: StorageAssetType[]) {
  return portfolio.reduce((accumulator, obj) => accumulator + obj.total, 0);
}
