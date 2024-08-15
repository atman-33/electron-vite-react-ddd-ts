import { DeleteUserInput } from '../application/services/user/delete-user-use-case';
import { GetUserByIdArgs } from '../application/services/user/get-user-by-id-use-case';
import { RegisterUserInput } from '../application/services/user/register-user-use-case';
import { UpdateUserInput } from '../application/services/user/update-user-use-case';
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

  // user-controller
  registerUser: async (registerUserData: RegisterUserInput) =>
    userController.registerUser(registerUserData),
  getUsers: async () => userController.getUsers(),
  getUserById: async (getUserByIdArgs: GetUserByIdArgs) =>
    userController.getUserById(getUserByIdArgs),
  updateUser: async (updateUserData: UpdateUserInput) => userController.updateUser(updateUserData),
  deleteUser: async (deleteUserData: DeleteUserInput) => userController.deleteUser(deleteUserData)
};

/** APIの型定義。renderer.d.tsファイルで参照する。*/
export type Api = typeof apiHandlers;
