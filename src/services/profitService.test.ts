import { AssetType } from "../store/assets.model";
import { StorageAssetType } from "./localStorage.service";
import { calculateProfitSum, calculateSum } from "./profit.service";

const mockAsset: AssetType[] = [
  {
    changePercent24Hr: "...",
    explorer: "...",
    id: "bitcoin",
    marketCapUsd: "...",
    maxSupply: "...",
    name: "Bitcoin",
    priceUsd: "1100",
    rank: "...",
    supply: "...",
    symbol: "...",
    volumeUsd24Hr: "...",
    vwap24Hr: "...",
  },
];

const mockStorageAsset: StorageAssetType[] = [
  {
    asset: {
      changePercent24Hr: "...",
      explorer: "...",
      id: "bitcoin",
      marketCapUsd: "...",
      maxSupply: "...",
      name: "Bitcoin",
      priceUsd: "1000",
      rank: "...",
      supply: "...",
      symbol: "...",
      volumeUsd24Hr: "...",
      vwap24Hr: "...",
    },
    id: "l91rzn14",
    quantity: 2,
    total: 2000,
  },
];

describe("Calculation func tests", () => {
  afterEach(() => {
    mockStorageAsset.pop();
  });

  test("calculateSum test", () => {
    // Must return sum of "total" prop
    expect(calculateSum(mockStorageAsset)).toBe(2000);
    const newMockAsset = JSON.parse(JSON.stringify(mockStorageAsset[0]));
    mockStorageAsset.push(newMockAsset);
    expect(calculateSum(mockStorageAsset)).toBe(4000);
  });

  test("calculateProfitSum test", () => {
    // Must return current price * quantity
    expect(calculateProfitSum(mockStorageAsset, mockAsset)).toBe(2200);
    const newMockAsset = JSON.parse(JSON.stringify(mockStorageAsset[0]));
    mockStorageAsset.push(newMockAsset);
    expect(calculateProfitSum(mockStorageAsset, mockAsset)).toBe(4400);

  });
});
