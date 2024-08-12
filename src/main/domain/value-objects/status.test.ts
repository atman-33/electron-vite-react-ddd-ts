import { describe, expect, test } from '@jest/globals';
import { Status } from './status';

describe('status', () => {
  test('値の場合にエラーを投げる', () => {
    expect(() => new Status(0)).not.toThrow();
    expect(() => new Status(1)).not.toThrow();
    expect(() => new Status(2)).toThrow('Invalid status value.');
  });
});
