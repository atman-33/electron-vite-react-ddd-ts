# TailwindCSS追加

## 参考URL

[【Tailwind CSS】Vite×React×TypeScriptにおける環境構築方法](https://qiita.com/enumura1/items/71d4b4f75123cf5135fa)

## ステップ

### インストール

```sh
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### `tailwind.config.js`を変更

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/renderer/index.html', './src/renderer/src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {}
  },
  plugins: []
};
```

### tailwindスタイルシートを作成

`src\renderer\src\styles\globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### スタイルシートを適用

`src\renderer\src\main.tsx`

```tsx
import './styles/globals.css';

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
```

## TailwindCSSのClass属性を自動並び替え

Class属性が自動ソートされるように、`prettier-plugin-tailwindcss`を導入する。

- インストール

```bash
npm install -D prettier prettier-plugin-tailwindcss
```

- prettier にプラグインを追加

`.prettierrc.yaml`

```yaml
singleQuote: true
semi: true
printWidth: 100
trailingComma: none
endOfLine: 'lf'
plugins: [prettier-plugin-tailwindcss]
```
