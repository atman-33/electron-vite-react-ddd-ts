import { userController } from './user/user-controller';

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
  getProcessCwd: async () => process.cwd(),

  registerUser: async (name: string) => userController.registerUser(name),
  getUsers: async () => userController.getUsers(),
  getUserById: async (id: string) => userController.getUserById(id),
  updateUser: async (id: string, name: string) => userController.updateUser(id, name),
  deleteUser: async (id: string) => userController.deleteUser(id)
};

/** APIの型定義。renderer.d.tsファイルで参照する。*/
export type Api = typeof apiHandlers;
