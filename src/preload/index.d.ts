import { ElectronAPI } from '@electron-toolkit/preload';
import { Api } from '../main/presentation/api';

declare global {
  interface Window {
    electron: ElectronAPI;
    api: Api;
  }
}
