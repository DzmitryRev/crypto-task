export type AssetType = {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
  explorer: string;
};

export type AssetsResponseType = {
  data: AssetType[]
  timestamp: number;
};

export type AssetResponseType = {
  data: AssetType
  timestamp: number;
};
