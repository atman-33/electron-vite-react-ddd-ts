import { describe, expect, test } from '@jest/globals';
import { SortOrder } from './sort-order';

describe('status', () => {
  test('値の場合にエラーを投げる', () => {
    expect(() => new SortOrder(0)).toThrow();
    expect(() => new SortOrder(1)).not.toThrow();
  });
});
