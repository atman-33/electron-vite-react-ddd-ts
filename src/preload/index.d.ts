import { ElectronAPI } from '@electron-toolkit/preload';
import { Api } from '../main/presentation/api-handlers';

declare global {
  interface Window {
    electron: ElectronAPI;
    api: Api;
  }
}
