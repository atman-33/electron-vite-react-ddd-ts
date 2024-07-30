# ファイルベースルーティング追加

## 参考URL

[Vite + React ファイルベースルーティング導入](https://zenn.dev/mczk9402/articles/314705d07e0e97)
[generouted](https://github.com/oedotme/generouted)

## ステップ

### インストール

```sh
npm install @vitejs/plugin-react react-router-dom @generouted/react-router generouted
```

### セットアップ

createBrowserRouterを使って、ファイルベースルーティング用のrouteを読み込む。

`src\renderer\src\main.tsx`

```tsx
import './assets/main.css';

import { routes } from 'generouted/react-router';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
``

pagesフォルダを作成し、その直下にindex.tsxを作成する。  
> App.tsxは不要なため削除する。

```sh
+-- src
|   +-- renderer
    |   +-- src
    |   |   +-- main.tsx
        |   +-- pages
            |   +-- index.tsx
```

上記で、pagesフォルダ以下がファイルベースルーティングの対象となる。
