# ESLintのセットアップ方法

オニオンアーキテクチャの依存関係を遵守するための不正なimport検知のルールを追加する。

- ドメイン層が依存してはいけない層

  - アプリケーション層
  - インフラストラクチャ層
  - プレゼンテーション層

- アプリケーション層が依存してはいけない層

  - インフラストラクチャ層
  - プレゼンテーション層

## ステップ

### インストール

```sh
npm i -D eslint eslint-plugin-import eslint-import-resolver-typescript @typescript-eslint/eslint-plugin
```

### ESLint設定

- 不正import検知のルールを追加する。

`.eslintrc.cjs`

```cjs
module.exports = {
  extends: [
    ...,
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    ...,
    'import/no-restricted-paths': [
      'error',
      {
        zones: [
          // Domain層が依存してはいけない領域
          {
            target: './src/main/domain/**/!(*.spec.ts|*.test.ts)',
            from: './src/main/application/**/*',
            message: 'Domain層でUseCase（Application）層をimportしてはいけません。'
          },
          {
            target: './src/main/domain/**/!(*.spec.ts|*.test.ts)',
            from: './src/main/presentation/**/*',
            message: 'Domain層でPresentation層をimportしてはいけません。'
          },
          {
            target: './src/main/domain/**/!(*.spec.ts|*.test.ts)',
            from: './src/main/infrastructure/**/*!(test).ts',
            message: 'Domain層でInfrastructure層をimportしてはいけません。'
          },
          // Application層（ユースケース）が依存してはいけない領域
          {
            target: './src/main/application/**/!(*.spec.ts|*.test.ts)',
            from: './src/main/presentation/**/*',
            message: 'Application層（ユースケース）でPresentation層をimportしてはいけません。'
          },
          {
            target: './src/main/application/**/!(*.spec.ts|*.test.ts)',
            from: './src/main/infrastructure/**/*',
            message: 'Application層（ユースケース）でInfrastructure層をimportしてはいけません。'
          }
        ]
      }
    ]
  }
};
```
