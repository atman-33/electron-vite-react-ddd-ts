# .env セットアップ

electron ビルド時に、exeファイルと同階層の`.env`ファイルを参照するようにする。

## ステップ

### Envタイプを作成

`src\main\domain\env\env.ts`

```ts
type Env = {
  DATABASE_URL: string;
};

export type { Env };
```

### Envリポジトリを作成

`src\main\domain\env\ienv-repository.ts`

```ts
import { Env } from './env';

interface IEnvRepository {
  get(): Env;
}

export type { IEnvRepository };
```

`src\main\infrastructure\env\env-repository.ts`

```ts
import * as dotenv from 'dotenv';
import { app } from 'electron';
import path from 'path';
import { Env } from '../../domain/env/env';
import { IEnvRepository } from '../../domain/env/ienv-repository';

export class EnvRepository implements IEnvRepository {
  constructor() {
    const envPath =
      process.env.NODE_ENV === 'development'
        ? `${process.cwd()}/.env`
        : `${path.dirname(app.getPath('exe'))}/resources/.env`;

    dotenv.config({ path: envPath });
  }

  get<K extends keyof Env>(key: K): Env[K] {
    return process.env[key] as Env[K];
  }
}
```

### ビルド時に`.env`を出力する設定を追加

`package.json`

```json
  "build": {
    "extraResources": [
      {
        "from": "./.env",
        "to": "./.env"
      }
    ]
  },
  ...
```

> `ビルド後のアプリ配置フォルダ/resources`に`.env`が出力される。
