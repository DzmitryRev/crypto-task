import { AssetType } from 'server/src/models/models';
import { StorageAssetType } from '../localStorage.service';
import { calculateProfitSum, calculateSum } from '../profit.service';

const mockAsset: AssetType[] = [
  {
    changePercent24Hr: '...',
    explorer: '...',
    id: 'bitcoin',
    marketCapUsd: '...',
    maxSupply: '...',
    name: 'Bitcoin',
    priceUsd: '1100',
    rank: '...',
    supply: '...',
    symbol: '...',
    volumeUsd24Hr: '...',
    vwap24Hr: '...',
  },
];

const mockStorageAsset: StorageAssetType[] = [
  {
    asset: {
      changePercent24Hr: '...',
      explorer: '...',
      id: 'bitcoin',
      marketCapUsd: '...',
      maxSupply: '...',
      name: 'Bitcoin',
      priceUsd: '1000',
      rank: '...',
      supply: '...',
      symbol: '...',
      volumeUsd24Hr: '...',
      vwap24Hr: '...',
    },
    id: 'l91rzn14',
    quantity: 2,
    total: 2000,
  },
];

describe('Calculation func tests', () => {
  afterEach(() => {
    mockStorageAsset.pop();
  });

  test("Should return sum of 'total' prop.", () => {
    // Must return sum of "total" prop
    expect(calculateSum(mockStorageAsset)).equal(2000);
    const newMockAsset = JSON.parse(JSON.stringify(mockStorageAsset[0]));
    mockStorageAsset.push(newMockAsset);
    expect(calculateSum(mockStorageAsset)).equal(4000);
  });

  test("Should return sum of 'priceUsd' * 'quantity' props.", () => {
    // Must return current price * quantity
    expect(calculateProfitSum(mockStorageAsset, mockAsset)).toBe(2200);
    const newMockAsset = JSON.parse(JSON.stringify(mockStorageAsset[0]));
    mockStorageAsset.push(newMockAsset);
    expect(calculateProfitSum(mockStorageAsset, mockAsset)).toBe(4400);
  });
});
