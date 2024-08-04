import { describe, expect, test } from '@jest/globals';
import path from 'path';
import { ConfigManager } from './config-manager';

describe('config-manager', () => {
  test('config.jsonの値を取得する', () => {
    const configManager = new ConfigManager(path.resolve(__dirname, 'config.json'));
    expect('file:./dev.db').toBe(configManager.get('DATABASE_URL'));
  });
});
