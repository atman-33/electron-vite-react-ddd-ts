import { describe, expect, test } from '@jest/globals';
import path from 'path';
import { ConfigRepository } from './config-repository';

describe('config-repository', () => {
  test('DATABASE_URLを取得する', () => {
    const configRepository = new ConfigRepository(path.resolve(__dirname, 'config.json'));

    expect('Hello World').toBe(configRepository.get().HELLO_WORLD);
  });
});
