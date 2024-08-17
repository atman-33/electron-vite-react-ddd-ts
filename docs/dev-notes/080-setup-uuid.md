# uuidライブラリのセットアップ方法

## ステップ

### インストール

```sh
npm i uuid
npm i -D @types/uuid
```

### uuid生成

e.g.  

```ts
import { v4 as uuidv4 } from 'uuid';

// Generate a unique ID
const uniqueId = uuidv4();
console.log('A unique ID:', uniqueId);
```
