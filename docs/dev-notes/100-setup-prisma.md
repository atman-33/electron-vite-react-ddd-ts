# Prismaセットアップ

## ステップ

### インストール

```sh
npm i -D prisma
npm i @prisma/client
```

### prisma初期化

```sh
npx prisma init --datasource-provider sqlite
```

### マイグレーション

スキーマをDBテーブルに反映する。  

```sh
npx prisma migrate dev --name init
```

### PrismaClient生成

```sh
npx prisma generate
```

### Prismaのトランザクション管理を実装

`src\main\application\shared\itransaction-manager.ts`

```ts
export interface ITransactionManager {
  begin<T>(callback: () => Promise<T>): Promise<T | undefined>;
}
```

`src\main\infrastructure\prisma\prisma-client.ts`

```ts
import { PrismaClient } from '@prisma/client';
import { EnvRepository } from '../env/env-repository';

const envRepository = new EnvRepository();

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: envRepository.get('DATABASE_URL')
    }
  }
});
export default prisma;
```

`src\main\infrastructure\shared\idata-access-client-manager.ts`

```ts
export interface IDataAccessClientManager<T> {
  setClient(client: T): void;
  getClient(): T;
}
```

`src\main\infrastructure\prisma\prisma-client-manager.ts`

```ts
import { Prisma, PrismaClient } from '@prisma/client';
import { IDataAccessClientManager } from '../shared/idata-access-client-manager';
import prisma from './prisma-client';

type Client = PrismaClient | Prisma.TransactionClient;
export class PrismaClientManager implements IDataAccessClientManager<Client> {
  private client: Client = prisma;

  setClient(client: Client): void {
    this.client = client;
  }

  getClient() {
    return this.client;
  }
}
```

`src\main\infrastructure\prisma\prisma-transaction-manager.ts`

```ts
import { ITransactionManager } from '../../application/shared/itransaction-manager';
import prisma from './prisma-client';
import { PrismaClientManager } from './prisma-client-manager';

export class PrismaTransactionManager implements ITransactionManager {
  constructor(private clientManager: PrismaClientManager) {}

  async begin<T>(callback: () => Promise<T>): Promise<T | undefined> {
    return await prisma.$transaction(async (transaction) => {
      this.clientManager.setClient(transaction);

      const res = await callback();
      // リセット
      this.clientManager.setClient(prisma);

      return res;
    });
  }
}
```

### Prisma用のリポジトリを実装

e.g.  

`src\main\infrastructure\prisma\user\prisma-user-repository.ts`

```ts
import { IUserRepository } from '../../../domain/models/user/iuser-repository';
import { UserDomain } from '../../../domain/models/user/user-domain';
import { UserId } from '../../../domain/value-objects/user-id';
import { UserName } from '../../../domain/value-objects/user-name';
import { PrismaClientManager } from '../prisma-client-manager';

export class PrismaUserRepository implements IUserRepository {
  constructor(private clientManager: PrismaClientManager) {}
  async insert(user: UserDomain): Promise<void> {
    const client = this.clientManager.getClient();

    await client.user.create({
      data: {
        id: user.id.value,
        name: user.name.value
      }
    });
  }
  async update(user: UserDomain): Promise<void> {
    const client = this.clientManager.getClient();

    await client.user.update({
      where: {
        id: user.id.value
      },
      data: {
        name: user.name.value
      }
    });
  }
  async delete(user: UserDomain): Promise<void> {
    const client = this.clientManager.getClient();

    await client.user.delete({
      where: {
        id: user.id.value
      }
    });
  }
  async findById(id: UserId): Promise<UserDomain | null> {
    const client = this.clientManager.getClient();

    const user = await client.user.findUnique({
      where: {
        id: id.value
      }
    });

    if (!user) {
      return null;
    }

    return UserDomain.reconstruct(new UserId(user.id), new UserName(user.name));
  }
}
```

### アプリケーションサービスを実装

e.g.  

`src\main\application\book\register-user-use-case.ts`

```ts
import { IUserRepository } from '../../domain/models/user/iuser-repository';
import { UserDomain } from '../../domain/models/user/user-domain';
import { UserName } from '../../domain/value-objects/user-name';
import { ITransactionManager } from '../shared/itransaction-manager';

export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly transactionManager: ITransactionManager
  ) {}

  async execute(name: string): Promise<void> {
    const user = UserDomain.create(new UserName(name));
    await this.transactionManager.begin(async () => {
      await this.userRepository.insert(user);
    });
  }
}
```
