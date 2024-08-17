import { describe, expect, test } from '@jest/globals';
import { UserName } from './user-name';

describe('user-name', () => {
  test('値を比較する', () => {
    const userName1 = new UserName('John Doe');
    const userName2 = new UserName(userName1.value);

    expect(userName1.equals(userName2)).toBe(true);
  });

  test('不正なフォーマットの場合にエラーを投げる', () => {
    expect(() => new UserName('')).toThrow('Name must be between 1 and 20 characters.');

    const userName1 = '012345678901234567891';
    expect(() => new UserName(userName1)).toThrow('Name must be between 1 and 20 characters.');
  });
});
