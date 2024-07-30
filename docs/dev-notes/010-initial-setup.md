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

### prettier変更

セミコロン有りに変更する。

`.prettierrc.yaml`

```prettier
semi: true
```
