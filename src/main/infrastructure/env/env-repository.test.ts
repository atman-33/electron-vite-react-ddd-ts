import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import * as dotenv from 'dotenv';
import { EnvRepository } from './env-repository';

jest.mock('dotenv');
jest.mock('electron', () => ({
  app: {
    getPath: jest.fn()
  }
}));
jest.mock('path', () => ({
  dirname: jest.fn(),
  resolve: jest.fn()
}));

describe('EnvRepository', () => {
  let envRepository: EnvRepository;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('developmentの環境変数を取得する', () => {
    process.env.NODE_ENV = 'development';
    const mockEnvPath = `${process.cwd()}/.env`;

    envRepository = new EnvRepository();

    expect(dotenv.config).toHaveBeenCalledWith({ path: mockEnvPath });
  });

  test('環境変数を取得する', () => {
    process.env.NODE_ENV = 'test';
    process.env.DATABASE_URL = 'some_value';

    envRepository = new EnvRepository();

    const value = envRepository.get('DATABASE_URL');
    expect(value).toBe('some_value');
  });
});
