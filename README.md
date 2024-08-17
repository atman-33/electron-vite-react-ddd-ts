# electron-vite-react-ts

An Electron application with React and TypeScript

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
# For windows
npm run build:win

# For macOS
npm run build:mac

# For Linux
npm run build:linux
```

## 技術スタック

### フロントエンド（renderer）

| パッケージ   | 説明                       |
| ------------ | -------------------------- |
| Generouted   | ファイルベースルーティング |
| Tailwind CSS | CSSフレームワーク          |
| shadcn/ui    | コンポーネントライブラリ   |
| Storybook    | UIコンポーネント開発環境   |

### バックエンド（main）

| パッケージ | 説明                 |
| ---------- | -------------------- |
| Prisma     | ORMライブラリ |
| TSyringe   | DIコンテナライブラリ |
| JSend      | JSONレスポンス仕様 [jsend](https://github.com/omniti-labs/jsend) |
| Jest       | テストフレームワーク |
