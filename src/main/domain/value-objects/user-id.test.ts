import { describe, expect, test } from '@jest/globals';
import { UserId } from './user-id';

describe('user-id', () => {
  test('値を比較する', () => {
    const userId1 = new UserId();
    const userId2 = new UserId(userId1.value);

    expect(userId1.equals(userId2)).toBe(true);
  });

  test('異なる値を比較する', () => {
    const userId1 = new UserId();
    const userId2 = new UserId();

    expect(userId1.equals(userId2)).toBe(false);
  });

  test('不正なフォーマットの場合にエラーを投げる', () => {
    expect(() => new UserId('a')).toThrow('Invalid UUID format.');
  });
});
