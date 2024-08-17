import * as path from 'path';

module.exports = {
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.d.ts', '.tsx']
      },
      typescript: {
        project: './tsconfig.json'
      },
      alias: {
        map: [['~', path.resolve(__dirname, './src')]],
        extensions: ['.js', '.jsx', '.ts', '.d.ts', '.tsx']
      }
    }
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    '@electron-toolkit/eslint-config-ts/recommended',
    '@electron-toolkit/eslint-config-prettier',
    'plugin:storybook/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
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
