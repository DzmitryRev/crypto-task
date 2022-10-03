import uniqid from 'uniqid';
import { AssetType } from '../store/assets.model';

export type StorageAssetType = {
  asset: AssetType;
  total: number;
  quantity: number;
  id: string;
};

class PortfolioStorage {
  static storageName: string = 'crypto-curr';

  static getPortfolio() {
    const storageData: StorageAssetType[] = JSON.parse(
      localStorage.getItem(this.storageName) || '[]',
    );
    return storageData;
  }

  static addToPortfolio(asset: AssetType, total: number, quantity: number) {
    const storageData: StorageAssetType[] = this.getPortfolio();
    const newAsset: StorageAssetType = {
      asset,
      total,
      quantity,
      id: uniqid(),
    };
    storageData.push(newAsset);
    localStorage.setItem(this.storageName, JSON.stringify(storageData));
  }

  static removeFromPortfolio(id: string) {
    const storageData: StorageAssetType[] = this.getPortfolio();
    localStorage.setItem(
      this.storageName,
      JSON.stringify(storageData.filter((item) => item.id !== id)),
    );
  }
}

export default PortfolioStorage;
