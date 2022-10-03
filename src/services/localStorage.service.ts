import { AssetType } from '../store/assets.model';

type StorageAssetType = {
  asset: AssetType;
  total: number;
};

class PortfolioStorage {
  static storageName: string = 'crypto-curr';

  static getPortfolio() {
    const storageData: StorageAssetType[] = JSON.parse(
      localStorage.getItem(this.storageName) || '[]',
    );
    return storageData;
  }

  static addToPortfolio(asset: AssetType, total: number) {
    const newAsset: StorageAssetType = { asset, total };
    const storageData: StorageAssetType[] = this.getPortfolio();
    storageData.push(newAsset);
    localStorage.setItem(this.storageName, JSON.stringify(storageData));
  }

  static removeFromPortfolio() {
  }
}

export default PortfolioStorage;
