# TSyringeセットアップ

## ステップ

### インストール

```sh
npm i -D tsyringe reflect-metadata
```

### tsconfig設定

`tsconfig.node.json`

```json
   "compilerOptions": {
     // ...,
     "experimentalDecorators": true,
     "emitDecoratorMetadata": true
   },
```

### jest設定

テストでポリフィルの影響を受けるため、テストが開始される前にポリフィルを読み込むような設定を行う。  

`setup-jest.ts`

```ts
import 'reflect-metadata';
```

jestで、jest.config.tsのsetupFilesAfterEnvを利用してテストが実行される前に、setupJest.tsを読み込むように設定を変更する。  

`jest.config.ts`

```ts
 module.exports = {
   // ...,
   setupFilesAfterEnv: ['./setup-jest.ts'],
 }
```

### デコレータを設定

- 依存関係として DI されるクラスに`@injectable()`デコレータを
- コンストラクタインジェクションする引数に`@inject('引数の型のInterface')`デコレータを適用

e.g.  

```ts
+ import { injectable, inject } from 'tsyringe';
  ...

+ @injectable()
  export class PrismaTransactionManager implements ITransactionManager {
    constructor(
+    @inject('IDataAccessClientManager')
      private clientManager: PrismaClientManager
    ) {}
    // ...
  }
```

- デコレータの主な設定対象
  - PrismaTransactionManager
  - リポジトリ
  - アプリケーションサービス（ユースケース）

### 依存オブジェクトを登録

依存オブジェクトの登録には、tsyringeが提供するcontainer.registerメソッドを利用する。  

e.g.  

`src\main\presentation\di.ts`

```ts
import { container, Lifecycle } from 'tsyringe';
import { PrismaClientManager } from '../infrastructure/prisma/prisma-client-manager';
import { PrismaTransactionManager } from '../infrastructure/prisma/prisma-transaction-manager';
import { PrismaTodoRepository } from '../infrastructure/prisma/todo/prisma-todo-repository';
import { PrismaUserRepository } from '../infrastructure/prisma/user/prisma-user-repository';

// re-export the container, so people must import this file
// and not accidentally get `container' directly from tsyringe
export { container };

// IDataAccessClientManager
container.register(
  'IDataAccessClientManager',
  {
    useClass: PrismaClientManager
  },
  // The same instance will be resolved for each resolution of this dependency during a single resolution chain
  { lifecycle: Lifecycle.ResolutionScoped }
);

// transactionManager
container.register('ITransactionManager', {
  useClass: PrismaTransactionManager
});

// repository
container.register('IUserRepository', {
  useClass: PrismaUserRepository
});

container.register('ITodoRepository', {
  useClass: PrismaTodoRepository
});
```

### インスタンス利用例

e.g.  

```ts
    const registerUserUseCase = container.resolve(
     RegisterUserUseCase
     );
```
