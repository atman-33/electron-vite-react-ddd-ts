/* eslint-disable @typescript-eslint/no-explicit-any */
import { ipcMain, ipcRenderer } from 'electron';

/**
 * ハンドリングするAPIを定義するオブジェクト。
 *
 * このオブジェクトをregisterAPIHandlersやcreateAPIInvokerの引数に指定する事で、
 * 自動でipcMain.handle(),ipcRenderer.invoke()の処理を実行させることが出来る。
 *
 * 「export API = typeof apiHandlers」とすることで、contextBridgeで公開されているAPIとその型を参照できる。
 */
export const apiHandlers = {
  getHello: async (name: string) => `Hello ${name}`,
  getTime: async () => {
    const now = new Date();
    return `${now.toLocaleString('ja-JP')}`;
  },
  getProcessCwd: async () => process.cwd()
};

/** mainプロセスにAPIをハンドリングする。mainプロセス上で呼び出す。*/
export const registerApiHandlers = (apiHandlersObj: Record<string, (...args: any[]) => any>) => {
  //invoke-apiというイベントを用意する。APIを使う際はまずこのイベントを通り、各種APIにはapiName引数を指定する事でアクセスする。
  ipcMain.handle('invoke-api', async (_event, apiName: string, ...args: any[]) => {
    // handlers引数にはAPI定義オブジェクト(apiHandlers等)を渡す。「handlers[apiName]」でAPI定義オブジェクトに登録したプロパティ(API)を呼び出す。
    if (apiHandlersObj[apiName]) {
      try {
        return await apiHandlersObj[apiName](...args);
      } catch (error) {
        console.error(`Error in '${apiName}':`, error);
        throw error;
      }
    } else {
      console.error(`API '${apiName}' is not defined.`);
      throw new Error(`API '${apiName}' is not defined.`);
    }
  });
};

/** rendererプロセスでAPIを呼び出すためのオブジェクトを生成する。preloadファイルで呼び出し、rendererプロセスに作成したオブジェクトを公開する。*/
export const createApiInvoker = (apiHandlersObj: Record<string, (...args: any[]) => any>) => {
  const apiRenderer: Record<string, (...args: any[]) => Promise<any>> = {};

  //API定義オブジェクト(apiHandlerObj)のプロパティを、１つずつipcMainの「invoke-api」イベントと接続する。
  for (const apiName in apiHandlersObj) {
    apiRenderer[apiName] = async (...args: any[]) => {
      return await ipcRenderer.invoke('invoke-api', apiName, ...args); //プロパティ名をapiName引数として渡し、各種APIにアクセスできるようにする。
    };
  }

  return apiRenderer; //for文で生成された、APIアクセス用のオブジェクトを返す
};

/** APIの型定義。renderer.d.tsファイルで参照する。*/
export type Api = typeof apiHandlers;
