import { electronAPI } from '@electron-toolkit/preload';
import { contextBridge } from 'electron';
import { createApiInvoker } from '../main/presentation/api';
import { apiHandlers } from '../main/presentation/api-handlers';

// Custom APIs for renderer
const apiRenderer = createApiInvoker(apiHandlers);
const api = apiRenderer;

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
