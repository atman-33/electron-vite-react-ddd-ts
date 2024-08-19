# 初期セットアップ

## 参考URL

[vite + electron-builderが使いやすい](https://zenn.dev/hikaelis/articles/b0e68ec5f7a30e)
[Getting Started](https://evite.netlify.app/guide/)

## ステップ

### electron-vite プロジェクト作成

```sh
npm create @quick-start/electron
```

```sh
√ Project name: ... electron-vite-react-ts
√ Select a framework: » react
√ Add TypeScript? ... Yes
√ Add Electron updater plugin? ... Yes
√ Enable Electron download mirror proxy? ... Yes
```

### VSCode設定

- 改行をLFに設定

`.vscode\settings.json`

```json
  "files.eol": "\n"
```

### prettier変更

- セミコロン有り

`.prettierrc.yaml`

```prettier
semi: true
```

### eslint変更

- アロー関数を有効

`.eslintrc.cjs`

```cjs
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off'
  }
```

### tsconfig変更

- デバッグ時にコンパイル前のソースを確認可能とするため、sourceMapをtrueに設定する。

`tsconfig.node.json`

```json
  "compilerOptions": {
    // ...,
    "sourceMap": true,
  }
```
