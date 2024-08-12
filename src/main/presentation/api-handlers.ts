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
