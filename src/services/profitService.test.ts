import { StorageAssetType } from "./localStorage.service";
import { calculateProfitSum, calculateSum } from "./profit.service";

const mockStorageAsset: StorageAssetType[] = [
  {
    asset: {
      changePercent24Hr: "-0.0537316660456077",
      explorer: "https://blockchain.info/",
      id: "bitcoin",
      marketCapUsd: "373110329439.6421989293879322",
      maxSupply: "21000000.0000000000000000",
      name: "Bitcoin",
      priceUsd: "19458.8579077306529979",
      rank: "1",
      supply: "19174318.0000000000000000",
      symbol: "BTC",
      volumeUsd24Hr: "5556084503.0372356058973382",
      vwap24Hr: "19476.5828088290000978",
    },
    id: "l91rzn14",
    quantity: 1,
    total: 19458.857907730653,
  },
];

test("calculateProfit test", () => {
  // Must return sum of "total" prop
  expect(calculateSum(mockStorageAsset)).toBe(19458.857907730653);
  mockStorageAsset[0].total = 10;
  expect(calculateSum(mockStorageAsset)).toBe(10);
  const newMockAsset = JSON.parse(JSON.stringify(mockStorageAsset[0]));
  mockStorageAsset.push(newMockAsset);
  expect(calculateSum(mockStorageAsset)).toBe(20);
  mockStorageAsset[1].total = 20;
  expect(calculateSum(mockStorageAsset)).toBe(30);
});
