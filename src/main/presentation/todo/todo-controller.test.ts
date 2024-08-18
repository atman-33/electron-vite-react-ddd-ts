import { beforeEach, describe, expect, test } from '@jest/globals';
import * as fs from 'fs';
import path from 'path';
import { TodoTypeDto } from '../../application/services/todo-type/dto/todo-type-dto';
import { UserDto } from '../../application/services/user/dto/user-dto';
import { JSendSuccess } from '../shared/jsend-response';
import { todoTypeController } from '../todo-type/todo-type-controller';
import { userController } from '../user/user-controller';
import { todoController } from './todo-controller';

describe('todo-controller', () => {
  beforeEach(async () => {
    const devDbPath = path.join(process.cwd(), 'prisma', 'dev.db');
    const fakeDbPath = path.join(process.cwd(), 'prisma', 'fake.db');

    try {
      // NOTE: 同期処理にしないとテスト結果が異なることに注意
      fs.copyFileSync(devDbPath, fakeDbPath);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  });

  test('todoを追加する', async () => {
    await userController.registerUser({ name: 'dummy' });
    const users = (await userController.getUsers()) as JSendSuccess<UserDto[]>;
    const todoTypes = (await todoTypeController.getTodoTypes()) as JSendSuccess<TodoTypeDto[]>;

    const todo = await todoController.addTodo({
      content: 'これはサンプルです',
      deadline: new Date(2024, 8, 18),
      userId: users.data.at(0)?.id ?? '',
      status: 0,
      todoType: {
        id: todoTypes.data.at(0)?.id ?? '',
        name: todoTypes.data.at(0)?.name ?? '',
        sortOrder: todoTypes.data.at(0)?.sortOrder ?? 0
      }
    });
    console.log(todo);
    expect(todo.status).toBe('success');
  });
});
