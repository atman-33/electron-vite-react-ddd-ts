# TailwindCSSのセットアップ方法

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

## ライト/ダークモード切替

- bodyタグのclassに色を設定する。

`src\renderer\index.html`

```html
<!-- NOTE: ダークモード用にbodyにクラスを設定 -->
<body class="bg-background text-foreground">
...
```

- モード切替用のコンポーネントを追加する。

`ModeToggle.tsx`

```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@renderer/components/shadcn/ui/dropdown-menu';
import { useEffect, useState } from 'react';

export const ModeToggle = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.classList.add(theme);
  }, []);

  const handleThemeClick = (theme: string) => {
    const body = document.body;

    if (theme === 'light') {
      body.classList.remove('dark');
      body.classList.add('light');
      setTheme('light');
    } else {
      body.classList.remove('light');
      body.classList.add('dark');
      setTheme('dark');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-10 w-10 rounded-full px-0 text-xl focus:outline-0">
          {theme === 'light' ? '🔆' : '🌙'}
          <span className="sr-only">Toggle theme</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleThemeClick('light')}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeClick('dark')}>Dark</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
```
