import { ElectronAPI } from '@electron-toolkit/preload';
import { Api } from '../main/presentation/api-handlers';
import { ApiType } from '../main/presentation/api-type';

declare global {
  interface Window {
    electron: ElectronAPI;
    api: Api;
    // NOTE: apiTypeはrendererで利用する型を定義している
    apiType: ApiType;
  }
}
